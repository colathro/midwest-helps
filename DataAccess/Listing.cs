using getthehotdish.Models;
using getthehotdish.Utils;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace getthehotdish.DataAccess
{
    public class Listing
    {

        [Key]
        public Guid Id { get; set; }
        public Guid OriginalId { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        [Required]
        public string BusinessName { get; set; }
        public string Address { get; set; }
        public bool Approved { get; set; }
        public string BusinessNameSearch
        {
            get
            {
                return this.BusinessName.ToLower();
            }
            set { }
        }
        [Required]
        public BusinessType BusinessType { get; set; }
        [Required]
        public BusinessHoursType Hours { get; set; }
        public string GiftCardUrl { get; set; }
        public string Website { get; set; }
        public string PhoneNumber { get; set; }
        public string LivestreamURL { get; set; }
        public string OrderURL { get; set; }
        [Required]
        [StringLength(500, ErrorMessage = "Message length can't be more than 500 characters.")]
        public string MessageToCustomer { get; set; }
        public DeliveryAppType DeliveryApps { get; set; }
        public BusinessChannelType BusinessChannels { get; set; }

        public Listing()
        {
        }

        public Listing(BusinessModel business)
        {
            Id = business.Id;
            PartitionKey = business.PartitionKey;
            BusinessName = business.Name;
            BusinessType = EnumUtils.GetValue<BusinessType>(business.Category);
            Hours = EnumUtils.GetValue<BusinessHoursType>(business.Hours);
            GiftCardUrl = business.GiftCardUrl;
            Website = business.Website;
            PhoneNumber = business.PhoneNumber;
            LivestreamURL = business.LiveStreamUrl;
            OrderURL = business.OrderUrl;
            MessageToCustomer = business.Message;
            Address = business.Address;
            BusinessChannels = EnumUtils.GetEnumFlag<BusinessChannelType>(business.Interactions);
            DeliveryApps = EnumUtils.GetEnumFlag<DeliveryAppType>(business.DeliveryApps);
        }

        public BusinessModel ToBusinessModel()
        {
            return new BusinessModel
            {
                Id = Id,
                PartitionKey = PartitionKey,
                Name = BusinessName,
                Category = Enum.GetName(typeof(BusinessType), BusinessType),
                Hours = Enum.GetName(typeof(BusinessHoursType), Hours),
                PhoneNumber = PhoneNumber,
                Website = Website,
                Message = MessageToCustomer,
                LiveStreamUrl = LivestreamURL,
                OrderUrl = OrderURL,
                GiftCardUrl = GiftCardUrl,
                Address = Address,
                CreatedOn = CreatedOn,
                OriginalId = OriginalId,
                Interactions = EnumUtils.GetEnumNameList(BusinessChannels).ToList(),
                DeliveryApps = EnumUtils.GetEnumNameList(DeliveryApps).ToList(),
            };
        }
    }
}
