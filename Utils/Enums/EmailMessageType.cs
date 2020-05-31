using System;
using System.ComponentModel;

namespace getthehotdish.Utils.Enums
{
    public enum EmailMessageType
    {
        [Description("MaskRequestSubmitted.html")]
        MaskRequestSubmitted = 1,
        [Description("MaskRequestApproved.html")]
        MaskRequestApproved = 2,
        [Description("MaskRequestDenied.html")]
        MaskRequestDenied = 3,
        [Description("DonationOnItsWay.html")]
        DonationOnItsWay = 4,
        [Description("Contact.html")]
        Contact = 5,
        [Description("MaskDonationApproved.html")]
        MaskDonationApproved = 6
    }
}