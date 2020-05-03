using getthehotdish.DataAccess;
using getthehotdish.Utils;
using System.ComponentModel.DataAnnotations;

namespace getthehotdish.Models
{
    public class AddressModel
    {
        [Required]
        public string Type { get; set; }
        [Required]
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        public string ZipCode { get; set; }

        public Address ToAddress()
        {
            return new Address
            {
                Type = EnumUtils.GetValue<AddressType>(Type),
                Address1 = Address1,
                Address2 = Address2,
                City = City,
                State = State,
                ZipCode = ZipCode
            };
        }
    }
}
