using getthehotdish.DataAccess;
using getthehotdish.Utils;
using getthehotdish.Utils.Extensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace getthehotdish.Models
{
    public class MaskRequestModel
    {
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        [Required]
        public RecipientModel Recipient { get; set; }
        [Required]
        public MaskDetailsModel MaskDetails { get; set; }
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
}
