using getthehotdish.DataAccess;
using getthehotdish.Utils;
using getthehotdish.Utils.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace getthehotdish.Models
{
    public class BusinessModel
    {
        [JsonPropertyName("id")]
        public Guid Id { get; set; }

        [JsonPropertyName("partitionKey")]
        public string PartitionKey { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("category")]
        public string Category { get; set; }

        [JsonPropertyName("hours")]
        public string Hours { get; set; }

        [JsonPropertyName("phoneNumber")]
        public string PhoneNumber { get; set; }

        [JsonPropertyName("website")]
        public string Website { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }

        [JsonPropertyName("liveStreamUrl")]
        public string LiveStreamUrl { get; set; }

        [JsonPropertyName("orderUrl")]
        public string OrderUrl { get; set; }

        [JsonPropertyName("giftCardUrl")]
        public string GiftCardUrl { get; set; }

        [JsonPropertyName("interactions")]
        public List<string> Interactions { get; set; }

        [JsonPropertyName("deliveryApps")]
        public List<string> DeliveryApps { get; set; }

        [JsonPropertyName("address")]
        public string Address { get; set; }

        [JsonPropertyName("approved")]
        public bool Approved { get; set; }

        [JsonPropertyName("originalId")]
        public Guid OriginalId { get; set; }

        [JsonPropertyName("createdOn")]
        public DateTime CreatedOn { get; set; }

        public BusinessModel()
        {
        }
        public BusinessModel(Listing listing)
        {
            Id = listing.Id;
            PartitionKey = listing.PartitionKey;
            Name = listing.BusinessName;
            Category = Enum.GetName(typeof(BusinessType), listing.BusinessType);
            Hours = Enum.GetName(typeof(BusinessHoursType), listing.Hours);
            PhoneNumber = listing.PhoneNumber.ToPhoneFormat();
            Website = listing.Website;
            Message = listing.MessageToCustomer;
            LiveStreamUrl = listing.LivestreamURL;
            OrderUrl = listing.OrderURL;
            GiftCardUrl = listing.GiftCardUrl;
            Address = listing.Address;
            CreatedOn = listing.CreatedOn;
            OriginalId = listing.OriginalId;
            Interactions = EnumUtils.GetEnumNameList(listing.BusinessChannels).ToList();
            DeliveryApps = EnumUtils.GetEnumNameList(listing.DeliveryApps).ToList();
        }

        public Listing ToListing()
        {
            return new Listing
            {
                Id = Id,
                PartitionKey = PartitionKey,
                BusinessName = Name,
                BusinessType = EnumUtils.GetEnum<BusinessType>(Category),
                Hours = EnumUtils.GetEnum<BusinessHoursType>(Hours),
                GiftCardUrl = GiftCardUrl,
                Website = Website,
                PhoneNumber = PhoneNumber.RemoveNonDigits(),
                LivestreamURL = LiveStreamUrl,
                OrderURL = OrderUrl,
                MessageToCustomer = Message,
                Address = Address,
                BusinessChannels = EnumUtils.GetEnumFlag<BusinessChannelType>(Interactions),
                DeliveryApps = EnumUtils.GetEnumFlag<DeliveryAppType>(DeliveryApps)
            };
        }
    }
}
