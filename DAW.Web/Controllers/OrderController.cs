using AutoMapper;
using DAW.Core.Abstraction;
using DAW.Core.BusinessObject;
using DAW.Dto.Orders;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAW.Web.Controllers
{
    [Route("api/[controller]")]
    public class OrderController : Controller
    {

        private readonly IMapper _mapper;
        private readonly IOrderManager _orderManager;
        private readonly UserManager<User> _userManager;

        public OrderController(IMapper mapper, IOrderManager orderManager, UserManager<User> userManager)
        {
            _mapper = mapper;
            _orderManager = orderManager;
            _userManager = userManager;
        }

        [HttpPost("CreateOrder")]
        public async Task<ActionResult<Order>> CreateOrder([FromBody] NewOrderDto order)
        {

            if (order == null)
                return BadRequest("No order was sent!");

            var orderToBeAdded = _mapper.Map<Order>(order);

            if (orderToBeAdded == null)
                return BadRequest("Order couldn't be mapped to correct format!");

            var res = await _orderManager.CreateOrder(orderToBeAdded, order.OrderedPaintings);

            if (res == null)
                return BadRequest("Order couldn't be added!");

            return res;

        }

        [HttpGet("GetDisplayOrders/{userId}")]
        public async Task<ActionResult<IEnumerable<DisplayOrderDto>>> GetMyDisplayOrders(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return BadRequest($"There is no user with ID {userId}");

            var userOrders = _orderManager.GetUserOrders(user);

            if (userOrders == null)
                return BadRequest("There are no orders for this user!");

            List<DisplayOrderDto> displayOrders = new();
            foreach(var order in userOrders)
            {
                DisplayOrderDto d = new DisplayOrderDto
                {
                    Id = order.Id,
                    UserName = user.LastName + ' ' + user.FirstName,
                    Date = order.Date,
                    TotalPrice = order.TotalPrice
                };

                displayOrders.Add(d);
            }

            return Ok(displayOrders);
        }

        [HttpGet("GetDetailedOrder/{orderId}")]
        public async Task<IActionResult> GetDetailedOrder(Guid orderId)
        {

            if (Guid.Empty == orderId)
                return BadRequest("OrderId can't be null!");

            var order = _orderManager.GetOrderById(orderId);
            var paintings = _orderManager.GetOrderPaintings(orderId);
            var user = await _userManager.FindByIdAsync(order.UserId);

            DetailedOrderDto orderToBeReturned = _mapper.Map<DetailedOrderDto>(order);
            orderToBeReturned.BuyerName = user.LastName + ' ' + user.FirstName;
            orderToBeReturned.PaintingsList = paintings;

            return Ok(orderToBeReturned);
        }

        [HttpDelete("CancelOrder/{orderId}")]
        public IActionResult DeleteOrder(Guid orderId)
        {
            var order = _orderManager.GetOrderById(orderId);
            if (order == null)
                return BadRequest($"There is no order with ID:{orderId}");

            _orderManager.CancelOrder(order);

            return Ok();
        }
    }
}
