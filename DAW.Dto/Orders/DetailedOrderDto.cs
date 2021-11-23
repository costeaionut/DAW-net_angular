using DAW.Core.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Dto.Orders
{
    public class DetailedOrderDto
    {
        public Guid OrderId { get; set; }
        public string BuyerId { get; set; }
        public string BuyerName { get; set; }
        public List<Painting> PaintingsList { get; set; }
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
    }
}
