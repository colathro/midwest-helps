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
        [JsonPropertyName("maskDetails")]
        [Required]
        public MaskDetailsModel MaskDetails { get; set; }
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
                MaskDetails = MaskDetails.ToMaskDetails(),
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
                MaskFor = EnumUtils.GetValue<MaskForType>(MaskFor),
                Name = Name,
                Company = Company,
                Email = Email,
                Phone = Phone.RemoveNonDigits()
            };
        }
    }

    public class MaskDetailsModel
    {
        [Required]
        public List<MaskInfoModel> Masks { get; set; }
        [StringLength(500, ErrorMessage = "Requirements length can't be more than 500 characters.")]
        public string Requirements { get; set; }

        public MaskDetails ToMaskDetails()
        {
            return new MaskDetails
            {
                Masks = Masks.Select(m => m.ToMaskInfo()).ToList(),
                Requirements = Requirements
            };
        }
    }

    public class MaskInfoModel
    {
        [Required]
        public string Type { get; set; }
        public int Quantity { get; set; }

        public MaskInfo ToMaskInfo()
        {
            return new MaskInfo
            {
                Type = EnumUtils.GetValue<MaskType>(Type),
                Quantity = Quantity
            };
        }
    }

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
