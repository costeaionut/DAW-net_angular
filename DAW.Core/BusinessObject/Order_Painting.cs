using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Core.BusinessObject
{
    public class Order_Painting
    {
        [Required]
        public Guid OrderId { get; set; }

        [Required]
        public Guid PaintingId { get; set; }
    }
}
