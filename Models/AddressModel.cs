using getthehotdish.DataAccess;
using getthehotdish.Utils;
using System.ComponentModel.DataAnnotations;
using System.Text;

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
        public string ToUSFormat()
        {
            var sb = new StringBuilder();
            sb.Append(Address1);
            if (!string.IsNullOrEmpty(Address2))
            {
                sb.Append($" {Address2}, ");
            } else
            {
                sb.Append(", ");
            }
            sb.Append($"{City}, ");
            sb.Append($"{State} ");
            sb.Append($"{ZipCode}");
            return sb.ToString();
        }
    }
}
