using getthehotdish.DataAccess;
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

        [JsonPropertyName("facebookUrl")]
        public string FacebookUrl { get; set; }

        [JsonPropertyName("instagramUrl")]
        public string InstagramUrl { get; set; }

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
            PhoneNumber = listing.PhoneNumber;
            Website = listing.Website;
            Message = listing.MessageToCustomer;
            FacebookUrl = ""; // TODO: store facebook URL in Listing
            InstagramUrl = ""; // TODO: store instagram URL in Listing
            LiveStreamUrl = listing.LivestreamURL;
            OrderUrl = listing.OrderURL;
            GiftCardUrl = listing.GiftCardUrl;
            Address = listing.Address;
            CreatedOn = listing.CreatedOn;
            OriginalId = listing.OriginalId;

            Interactions = new List<string>();
            if (listing.BusinessChannels.HasFlag(BusinessChannelType.Appointment))
            {
                Interactions.Add(BusinessChannelType.Appointment.ToString());
            }
            if (listing.BusinessChannels.HasFlag(BusinessChannelType.CurbSide))
            {
                Interactions.Add(BusinessChannelType.CurbSide.ToString());
            }
            if (listing.BusinessChannels.HasFlag(BusinessChannelType.LiveStream))
            {
                Interactions.Add(BusinessChannelType.LiveStream.ToString());
            }
            if (listing.BusinessChannels.HasFlag(BusinessChannelType.TakeOut))
            {
                Interactions.Add(BusinessChannelType.TakeOut.ToString());
            }
            if (listing.BusinessChannels.HasFlag(BusinessChannelType.Delivery))
            {
                Interactions.Add(BusinessChannelType.Delivery.ToString());
            }
            if (listing.BusinessChannels.HasFlag(BusinessChannelType.DriveThru))
            {
                Interactions.Add(BusinessChannelType.DriveThru.ToString());
            }

            DeliveryApps = new List<string>();
            if (listing.DeliveryApps.HasFlag(DeliveryAppType.UberEats))
            {
                DeliveryApps.Add(DeliveryAppType.UberEats.ToString());
            }
            if (listing.DeliveryApps.HasFlag(DeliveryAppType.Grubhub))
            {
                DeliveryApps.Add(DeliveryAppType.Grubhub.ToString());
            }
            if (listing.DeliveryApps.HasFlag(DeliveryAppType.DoorDash))
            {
                DeliveryApps.Add(DeliveryAppType.DoorDash.ToString());
            }
            if (listing.DeliveryApps.HasFlag(DeliveryAppType.Postmates))
            {
                DeliveryApps.Add(DeliveryAppType.Postmates.ToString());
            }
            if (listing.DeliveryApps.HasFlag(DeliveryAppType.FoodDudes))
            {
                DeliveryApps.Add(DeliveryAppType.FoodDudes.ToString());
            }
            if (listing.DeliveryApps.HasFlag(DeliveryAppType.BiteSquad))
            {
                DeliveryApps.Add(DeliveryAppType.BiteSquad.ToString());
            }
        }
        
        public static implicit operator Listing(BusinessModel b)
        {
            Listing ret = new Listing();

            ret.Id = b.Id;
            ret.PartitionKey = b.PartitionKey;
            ret.BusinessName = b.Name;
            ret.BusinessType = Enum.GetNames(typeof(BusinessType)).Where(h => h.ToLower() == b.Category.ToLower()).Select(c => (BusinessType)Enum.Parse(typeof(BusinessType), c)).FirstOrDefault();
            ret.Update(b);

            return ret;
        }
    }
}
