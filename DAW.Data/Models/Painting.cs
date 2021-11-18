using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Data.Models
{
    public class Painting
    {
        public Guid Id { get; set; }
        
        [Required]
        public string PainterId { get; set; }

        [Required]
        [MinLength(5), MaxLength(30)]
        public string Name { get; set; }

        [Required]
        public double Price { get; set; }

        [Required]
        public string CreationDate { get; set; }
    }
}
