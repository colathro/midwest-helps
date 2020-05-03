using getthehotdish.DataAccess;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace getthehotdish.Models
{
    public class DeliveryModel
    {
        [Required]
        public List<AddressModel> Addresses { get; set; }

        [StringLength(500, ErrorMessage = "Notes length can't be more than 500 characters.")]
        public string Notes { get; set; }

        public Delivery ToDelivery()
        {
            return new Delivery
            {
                Notes = Notes,
                Addresses = Addresses.Select(a => a.ToAddress()).ToList()
            };
        }
    }
}
