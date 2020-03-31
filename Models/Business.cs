using getthehotdish.DataAccess;
using System;
using System.Collections.Generic;

namespace getthehotdish.Models
{
    public class Business
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

        public Business(Listing listing)
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
            if (listing.AppointmentOnly)
            {
                Interactions.Add("appointment");
            }
            if (listing.CurbSide)
            {
                Interactions.Add("curbSide");
            }
            if (listing.LiveStream)
            {
                Interactions.Add("liveStream");
            }
            if (listing.TakeOut)
            {
                Interactions.Add("takeOut");
            }
            if (listing.Delivery)
            {
                Interactions.Add("delivery");
            }
            if (listing.DriveThru)
            {
                Interactions.Add("driveThru");
            }

            DeliveryApps = new List<string>();
            if (listing.UberEats)
            {
                DeliveryApps.Add("UberEats");
            }
            if (listing.Grubhub)
            {
                DeliveryApps.Add("GrubHub");
            }
            if (listing.DoorDash)
            {
                DeliveryApps.Add("DoorDash");
            }
            if (listing.Postmates)
            {
                DeliveryApps.Add("Postmates");
            }
            if (listing.FoodDudes)
            {
                DeliveryApps.Add("FoodDudes");
            }
            if (listing.BiteSquad)
            {
                DeliveryApps.Add("BiteSquad");
            }
        }
        
        public static implicit operator Listing(Business b)
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
            ret.CurbSide = b.Interactions.Contains("curbSide");
            ret.TakeOut = b.Interactions.Contains("takeOut");
            ret.DriveThru = b.Interactions.Contains("driveThru");
            ret.Delivery = b.Interactions.Contains("delivery");
            ret.LiveStream = b.LiveStreamUrl.Length > 0;
            ret.AppointmentOnly = b.Interactions.Contains("appointment");
            ret.UberEats = b.DeliveryApps.Contains("UberEats");
            ret.Grubhub = b.DeliveryApps.Contains("GrubHub");
            ret.DoorDash = b.DeliveryApps.Contains("DoorDash");
            ret.Postmates = b.DeliveryApps.Contains("Postmates");
            ret.FoodDudes = b.DeliveryApps.Contains("FoodDudes");
            ret.BiteSquad = b.DeliveryApps.Contains("BiteSquad");

            return ret;
        }
    }
}
