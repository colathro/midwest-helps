using getthehotdish.DataAccess;
using getthehotdish.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

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
        public RecipientDetails Recipient { get; set; }
        [JsonPropertyName("mask")]
        public MaskDetails Mask { get; set; }
        [JsonPropertyName("delivery")]
        public DeliveryDetails Delivery { get; set; }

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

    public class RecipientDetails
    {
        public string MaskFor { get; set; }
        public string Name { get; set; }
        public string Company { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        
        public Recipient ToRecipient()
        {
            return new Recipient
            {
                MaskFor = (MaskForType)Enum.Parse(typeof(MaskForType), MaskFor),
                Name = Name,
                Company = Company,
                Email = Email,
                Phone = Regex.Replace(Phone, "[^.0-9]", "")
            };
        }
    }

    public class MaskDetails
    {
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

    public class DeliveryDetails
    {
        public string Notes { get; set; }
        public List<AddressDetails> Addresses { get; set; }

        public Delivery ToDelivery()
        {
            return new Delivery
            {
                Notes = Notes,
                Addresses = Addresses.Select(a => a.ToAddress()).ToList()
            };
        }
    }

    public class AddressDetails
    {
        public string Type { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
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
