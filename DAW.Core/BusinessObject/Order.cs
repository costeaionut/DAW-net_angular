using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Core.BusinessObject
{
    public class Order
    {
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public double TotalPrice { get; set; }
    }
}
