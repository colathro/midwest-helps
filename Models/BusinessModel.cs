using getthehotdish.DataAccess;
using System;
using System.Collections.Generic;

namespace getthehotdish.Models
{
    public class BusinessModel
    {
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public int Hours { get; set; }
        public string PhoneNumber { get; set; }
        public string Website { get; set; }
        public string Message { get; set; }
        public string FacebookUrl { get; set; }
        public string InstagramUrl { get; set; }
        public string LiveStreamUrl { get; set; }
        public string OrderUrl { get; set; }
        public string GiftCardUrl { get; set; }
        public List<string> Interactions { get; set; }
        public List<string> DeliveryApps { get; set; }

        public BusinessModel(Listing listing)
        {
            Id = listing.Id;
            PartitionKey = listing.PartitionKey;
            Name = listing.BusinessName;
            Category = Enum.GetName(typeof(BusinessType), listing.BusinessType);
            Hours = listing.Hours;
            PhoneNumber = listing.PhoneNumber;
            Website = listing.Website;
            Message = listing.MessageToCustomer;
            FacebookUrl = ""; // TODO: store facebook URL in Listing
            InstagramUrl = ""; // TODO: store instagram URL in Listing
            LiveStreamUrl = listing.LivestreamURL;
            OrderUrl = ""; // TODO: store a business' online order link in Listing
            GiftCardUrl = listing.GiftCardUrl;

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
            foreach (string category in Enum.GetNames(typeof(BusinessType)))
            {
                if (category.ToLower() == b.Category.ToLower())
                {
                    ret.BusinessType = (BusinessType)Enum.Parse(typeof(BusinessType), category);
                }
            }
            ret.Hours = b.Hours;
            ret.GiftCardUrl = b.GiftCardUrl;
            ret.Website = b.Website;
            ret.PhoneNumber = b.PhoneNumber;
            ret.LivestreamURL = b.LiveStreamUrl;
            ret.OrderURL = b.OrderUrl;
            ret.MessageToCustomer = b.Message;

            if (b.Interactions.Contains(BusinessChannelType.CurbSide.ToString()))
            {
                ret.BusinessChannels = ret.BusinessChannels | BusinessChannelType.CurbSide;
            }
            if (b.Interactions.Contains(BusinessChannelType.TakeOut.ToString()))
            {
                ret.BusinessChannels = ret.BusinessChannels | BusinessChannelType.TakeOut;
            }
            if (b.Interactions.Contains(BusinessChannelType.Delivery.ToString()))
            {
                ret.BusinessChannels = ret.BusinessChannels | BusinessChannelType.Delivery;
            }
            if (b.LiveStreamUrl.Length > 0)
            {
                ret.BusinessChannels = ret.BusinessChannels | BusinessChannelType.LiveStream;
            }
            if (b.Interactions.Contains(BusinessChannelType.Appointment.ToString()))
            {
                ret.BusinessChannels = ret.BusinessChannels | BusinessChannelType.Appointment;
            }

            if (b.DeliveryApps.Contains(DeliveryAppType.UberEats.ToString()))
            {
                ret.DeliveryApps = ret.DeliveryApps | DeliveryAppType.UberEats;
            }
            if (b.DeliveryApps.Contains(DeliveryAppType.Grubhub.ToString()))
            {
                ret.DeliveryApps = ret.DeliveryApps | DeliveryAppType.Grubhub;
            }
            if (b.DeliveryApps.Contains(DeliveryAppType.DoorDash.ToString()))
            {
                ret.DeliveryApps = ret.DeliveryApps | DeliveryAppType.DoorDash;
            }
            if (b.DeliveryApps.Contains(DeliveryAppType.Postmates.ToString()))
            {
                ret.DeliveryApps = ret.DeliveryApps | DeliveryAppType.Postmates;
            }
            if (b.DeliveryApps.Contains(DeliveryAppType.FoodDudes.ToString()))
            {
                ret.DeliveryApps = ret.DeliveryApps | DeliveryAppType.FoodDudes;
            }
            if (b.DeliveryApps.Contains(DeliveryAppType.BiteSquad.ToString()))
            {
                ret.DeliveryApps = ret.DeliveryApps | DeliveryAppType.BiteSquad;
            }

            return ret;
        }
    }
}
