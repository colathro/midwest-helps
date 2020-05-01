using getthehotdish.DataAccess;
using getthehotdish.Utils;
using getthehotdish.Utils.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;

namespace getthehotdish.Models
{
    public class MaskRequestModel
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }
        [JsonPropertyName("partitionKey")]
        public string PartitionKey { get; set; }
        [JsonPropertyName("createdOn")]
        public DateTime CreatedOn { get; set; }
        [JsonPropertyName("recipient")]
        [Required]
        public RecipientModel Recipient { get; set; }
        [JsonPropertyName("mask")]
        [Required]
        public MaskModel Mask { get; set; }
        [JsonPropertyName("delivery")]
        [Required]
        public DeliveryModel Delivery { get; set; }

        public MaskRequestModel()
        {
        }
        public MaskRequestModel(MaskRequest maskRequest)
        {
            maskRequest.ToMaskRequestModel();
        }

        public MaskRequest ToMaskRequest()
        {
            return new MaskRequest
            {
                Id = Id,
                PartitionKey = PartitionKey,
                CreatedOn = CreatedOn,
                Recipient = Recipient.ToRecipient(),
                Mask = Mask.ToMask(),
                Delivery = Delivery.ToDelivery()
            };
        }
    }

    public class RecipientModel
    {
        [Required]
        public string MaskFor { get; set; }
        [Required]
        public string Name { get; set; }
        public string Company { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }

        public Recipient ToRecipient()
        {
            return new Recipient
            {
                MaskFor = EnumUtils.GetEnum<MaskForType>(MaskFor),
                Name = Name,
                Company = Company,
                Email = Email,
                Phone = Phone.RemoveNonDigits()
            };
        }
    }

    public class MaskModel
    {
        [Required]
        public List<string> Types { get; set; }
        public string Requirements { get; set; }

        public Mask ToMask()
        {
            return new Mask
            {
                Type = EnumUtils.GetEnumFlag<MaskType>(Types),
                Requirements = Requirements
            };
        }
    }

    public class DeliveryModel
    {
        public string Notes { get; set; }
        [Required]
        public List<AddressModel> Addresses { get; set; }

        public Delivery ToDelivery()
        {
            return new Delivery
            {
                Notes = Notes,
                Addresses = Addresses.Select(a => a.ToAddress()).ToList()
            };
        }
    }

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
                Type = EnumUtils.GetEnum<AddressType>(Type),
                Address1 = Address1,
                Address2 = Address2,
                City = City,
                State = State,
                ZipCode = ZipCode
            };
        }
    }
}
