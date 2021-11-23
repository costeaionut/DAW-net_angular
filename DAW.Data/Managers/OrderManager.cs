using DAW.Core.Abstraction;
using DAW.Core.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Data.Managers
{
    public class OrderManager : IOrderManager
    {

        private readonly RepositoryContext _context;

        public OrderManager(RepositoryContext context)
        {
            _context = context;
        }

        public async Task<Order> CreateOrder(Order orderToBeAdded, List<Painting> orderedPaintings)
        {
            var res = await _context.Orders.AddAsync(orderToBeAdded);
            await _context.SaveChangesAsync();
            
            foreach (var painting in orderedPaintings)
            {
                await _context.OrderPaintings.AddAsync(
                    new Order_Painting { OrderId = res.Entity.Id, PaintingId = painting.Id }
                    );
                
                await _context.SaveChangesAsync();
            
            }
            
            return res.Entity;
        }

        public List<Painting> GetOrderPaintings(Guid orderId)
        {
            List<Painting> paintingsInOrder = new();

            var paintingListId = _context.OrderPaintings.Where(op => op.OrderId == orderId);

            foreach(var op in paintingListId)
                paintingsInOrder.Add(_context.Paintings.FirstOrDefault(p => p.Id == op.PaintingId));

            return paintingsInOrder;

        }

        public Order GetOrderById(Guid orderId)
            => _context.Orders.FirstOrDefault(o => o.Id == orderId);

        public IEnumerable<Order> GetUserOrders(User user)
            => _context.Orders.Where(o => o.UserId == user.Id).ToList();

        public async Task<bool> CancelOrder(Order order)
        {
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return true;
        }

    }
}
