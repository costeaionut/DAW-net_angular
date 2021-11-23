using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Dto.Orders
{
    public class DisplayOrderDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public DateTime Date { get; set; }
        public double TotalPrice { get; set; }
    }
}
