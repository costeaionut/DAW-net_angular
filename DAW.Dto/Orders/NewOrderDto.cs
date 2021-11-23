using DAW.Core.BusinessObject;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Dto.Orders
{
    public class NewOrderDto
    {
        public string UserId { get; set; }
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
        public List<Painting> OrderedPaintings { get; set; }
    }
}
