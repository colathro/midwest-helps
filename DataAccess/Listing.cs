using getthehotdish.Models;
using System;
using System.Linq;

namespace getthehotdish.DataAccess
{
    public class Listing
    {

        [System.ComponentModel.DataAnnotations.Key]
        public Guid Id { get; set; }
        public Guid OriginalId { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public string BusinessName { get; set; }
        public string Address { get; set; }
        public bool Approved { get; set; }
        public string BusinessNameSearch { 
            get 
            {
                return this.BusinessName.ToLower();
            }
            set { }
        }
        public BusinessType BusinessType { get; set; }
        public BusinessHoursType Hours { get; set; }
        public string GiftCardUrl { get; set; }
        public string Website { get; set; }
        public string PhoneNumber { get; set; }
        public string LivestreamURL { get; set; }
        public string OrderURL { get; set; }
        public string MessageToCustomer { get; set; }
        public DeliveryAppType DeliveryApps { get; set; }
        public BusinessChannelType BusinessChannels { get; set; }

        public void Update (BusinessModel business)
        {
            Hours = Enum.GetNames(typeof(BusinessHoursType)).Where(h => h.ToLower() == business.Hours.ToLower()).Select(c => (BusinessHoursType)Enum.Parse(typeof(BusinessHoursType), c)).FirstOrDefault();
            GiftCardUrl = business.GiftCardUrl;
            Website = business.Website;
            PhoneNumber = business.PhoneNumber;
            LivestreamURL = business.LiveStreamUrl;
            OrderURL = business.OrderUrl;
            MessageToCustomer = business.Message;
            Address = business.Address;

            BusinessChannels = BusinessChannelType.None;
            if (business.Interactions.Contains(BusinessChannelType.CurbSide.ToString()))
            {
                BusinessChannels = BusinessChannels | BusinessChannelType.CurbSide;
            }
            if (business.Interactions.Contains(BusinessChannelType.TakeOut.ToString()))
            {
                BusinessChannels = BusinessChannels | BusinessChannelType.TakeOut;
            }
            if (business.Interactions.Contains(BusinessChannelType.Delivery.ToString()))
            {
                BusinessChannels = BusinessChannels | BusinessChannelType.Delivery;
            }
            if (business.Interactions.Contains(BusinessChannelType.LiveStream.ToString()))
            {
                BusinessChannels = BusinessChannels | BusinessChannelType.LiveStream;
            }
            if (business.Interactions.Contains(BusinessChannelType.Appointment.ToString()))
            {
                BusinessChannels = BusinessChannels | BusinessChannelType.Appointment;
            }
            if (business.Interactions.Contains(BusinessChannelType.DriveThru.ToString()))
            {
                BusinessChannels = BusinessChannels | BusinessChannelType.DriveThru;
            }

            DeliveryApps = DeliveryAppType.None;
            if (business.DeliveryApps.Contains(DeliveryAppType.UberEats.ToString()))
            {
                DeliveryApps = DeliveryApps | DeliveryAppType.UberEats;
            }
            if (business.DeliveryApps.Contains(DeliveryAppType.Grubhub.ToString()))
            {
                DeliveryApps = DeliveryApps | DeliveryAppType.Grubhub;
            }
            if (business.DeliveryApps.Contains(DeliveryAppType.DoorDash.ToString()))
            {
                DeliveryApps = DeliveryApps | DeliveryAppType.DoorDash;
            }
            if (business.DeliveryApps.Contains(DeliveryAppType.Postmates.ToString()))
            {
                DeliveryApps = DeliveryApps | DeliveryAppType.Postmates;
            }
            if (business.DeliveryApps.Contains(DeliveryAppType.FoodDudes.ToString()))
            {
                DeliveryApps = DeliveryApps | DeliveryAppType.FoodDudes;
            }
            if (business.DeliveryApps.Contains(DeliveryAppType.BiteSquad.ToString()))
            {
                DeliveryApps = DeliveryApps | DeliveryAppType.BiteSquad;
            }
        }
    }
}
