using getthehotdish.Models;
using getthehotdish.Utils;
using getthehotdish.Utils.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace getthehotdish.DataAccess
{
    public class MaskRequest : IValidatableObject
    {
        [Key]
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid EditKey { get; set; }
        public Guid OriginalId { get; set; }
        public bool Approved { get; set; }
        [Required]
        public Recipient Recipient { get; set; }
        [Required]
        public Mask Mask { get; set; }
        [Required]
        public Delivery Delivery { get; set; }

        public MaskRequest()
        {
        }

        public MaskRequest(MaskRequestModel mr)
        {
            mr.ToMaskRequest();
        }

        public MaskRequestModel ToMaskRequestModel()
        {
            return new MaskRequestModel
            {
                Id = Id,
                PartitionKey = PartitionKey,
                CreatedOn = CreatedOn,
                Recipient = Recipient.ToRecipientDetailsModel(),
                Mask = Mask.ToMaskModel(),
                Delivery = Delivery.ToDeliveryModel()
            };
        }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Delivery.Addresses.Count == 0)
            {
                yield return new ValidationResult("A delivery address must be provided.");
            }

            if (Delivery.Addresses.GroupBy(info => info.Type)
                .Select(group => new
                {
                    Type = group.Key,
                    Count = group.Count()
                })
                .Any(g => g.Count > 1))
            {
                yield return new ValidationResult("Only one address of each type should be provided.");
            }
        }
    }

    [Owned]
    public class Recipient
    {
        [Required]
        public MaskForType MaskFor { get; set; }
        [Required]
        public string Name { get; set; }
        public string Company { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression(@"^\d{10}$",
         ErrorMessage = "Phone not valid.")]
        public string Phone { get; set; }

        public RecipientModel ToRecipientDetailsModel()
        {
            return new RecipientModel
            {
                MaskFor = EnumUtils.GetName(MaskFor),
                Name = Name,
                Company = Company,
                Email = Email,
                Phone = Phone.ToPhoneFormat(),
            };
        }
    }

    [Owned]
    public class Mask
    {
        [Required]
        public MaskType Type { get; set; }
        [StringLength(500, ErrorMessage = "Requirements length can't be more than 500 characters.")]
        public string Requirements { get; set; }

        public MaskModel ToMaskModel()
        {
            return new MaskModel
            {
                Types = EnumUtils.GetEnumNameList(Type).ToList(),
                Requirements = Requirements
            };
        }
    }

    [Owned]
    public class Delivery
    {
        [StringLength(500, ErrorMessage = "Notes length can't be more than 500 characters.")]
        public string Notes { get; set; }
        [Required]
        public List<Address> Addresses { get; set; }

        public DeliveryModel ToDeliveryModel()
        {
            return new DeliveryModel
            {
                Notes = Notes,
                Addresses = Addresses.Select(a => a.ToAddressModel()).ToList()
            };
        }
    }

    [Owned]
    public class Address
    {
        [Required]
        public AddressType Type { get; set; }
        [Required]
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }
        [Required]
        [RegularExpression(@"(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)",
         ErrorMessage = "Zip code not valid.")]
        public string ZipCode { get; set; }

        public AddressModel ToAddressModel()
        {
            return new AddressModel
            {
                Type = EnumUtils.GetName(Type),
                Address1 = Address1,
                Address2 = Address2,
                City = City,
                State = State,
                ZipCode = ZipCode
            };
        }
    }
}
