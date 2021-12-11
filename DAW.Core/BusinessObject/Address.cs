using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAW.Core.BusinessObject
{
    public class Address
    {
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }
            
        [Required]
        public string Country { get; set; }
             
        [Required]
        public string Town { get; set; }

        [Required]
        public string StreetName { get; set; }

        [Required]
        public int StreetNumber { get; set; }

        [Required]
        public string FlatNumber { get; set; }

        [Required]
        public string PostalCode { get; set; }
    }
}
