using DAW.Core.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Core.Abstraction
{
    public interface IOrderManager
    {
        Task<Order> CreateOrder(Order orderToBeAdded, List<Painting> orderedPaintings);
        IEnumerable<Order> GetUserOrders(User user);
        Order GetOrderById(Guid orderId);
        List<Painting> GetOrderPaintings(Guid orderId);
        Task<bool> CancelOrder(Order order);
    }
}
