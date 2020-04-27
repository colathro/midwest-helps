using getthehotdish.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace getthehotdish.DataAccess
{
    public class MaskRequest : IValidatableObject
    {
        [System.ComponentModel.DataAnnotations.Key]
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid EditKey { get; set; }
        public Guid OriginalId { get; set; }
        public bool Approved { get; set; }
        public Recipient Recipient { get; set; }
        public Mask Mask { get; set; }
        public Delivery Delivery { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (EditKey == OriginalId)
            {
                yield return new ValidationResult(
                    "EditKey cannot match OriginalId",
                    new[] { nameof(EditKey), nameof(OriginalId) });
            }
        }
    }

    public class Recipient
    {
        public MaskForType MaskFor { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }

    public class Mask
    {
        public MaskType Type { get; set; }
        public string Requirements { get; set; }
    }

    public class Delivery
    {
        public string Notes { get; set; }
        public List<Address> Addresses { get; set; }
    }

    public class Address
    {
        public AddressType Type { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
    }
}
