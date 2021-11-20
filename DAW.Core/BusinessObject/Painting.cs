using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Core.BusinessObject
{
    public class Painting
    {
        public Guid Id { get; set; }
        
        [Required]
        public string PainterId { get; set; }

        [Required]
        [MinLength(5), MaxLength(80)]
        public string Name { get; set; }

        [Required]
        [MinLength(10), MaxLength(512)]
        public string Description { get; set; }

        [Required]
        public string ImageLink { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public DateTime CreationDate { get; set; }
    }
}
