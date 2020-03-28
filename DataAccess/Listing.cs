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
        public string PhoneNumber { get; set; }
        public string LivestreamURL { get; set; }
        public string OrderURL { get; set; }
        public string MessageToCustomer { get; set; }
        public bool CurbSide { get; set; }
        public bool TakeOut { get; set; }
        public bool DriveThru { get; set; }
        public bool Delivery { get; set; }
        public bool LiveStream { get; set; }
        public bool AppointmentOnly { get; set; }
        public bool UberEats { get; set; }
        public bool Grubhub { get; set; }
        public bool DoorDash { get; set; }
        public bool Postmates { get; set; }
        public bool FoodDudes { get; set; }
        public bool BiteSquad { get; set; }
    }
}
