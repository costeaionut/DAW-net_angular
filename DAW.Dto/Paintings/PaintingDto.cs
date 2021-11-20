using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Dto.Paintings
{
    public class PaintingDto
    {
        public Guid Id { get; set; }
        public string PainterId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageLink { get; set; }
        public double Price { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
