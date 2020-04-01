using System;

namespace getthehotdish.DataAccess
{
    public class Listing
    {
        [System.ComponentModel.DataAnnotations.Key]
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public string BusinessName { get; set; }
        public BusinessType BusinessType { get; set; }
        public int Hours { get; set; }
        public string GiftCardUrl { get; set; }
        public string Website { get; set; }
        public string PhoneNumber { get; set; }
        public string LivestreamURL { get; set; }
        public string OrderURL { get; set; }
        public string MessageToCustomer { get; set; }
        public DeliveryAppType DeliveryApps { get; set; }
        public BusinessChannelType BusinessChannels { get; set; }
    }
}
