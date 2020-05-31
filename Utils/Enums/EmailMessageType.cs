using System;
using System.ComponentModel;

namespace getthehotdish.Utils.Enums
{
    public enum EmailMessageType
    {
        [Description("MaskRequestSubmitted.html")]
        MaskRequestSubmitted = 1,
        [Description("MaskDonationSubmitted.html")]
        MaskDonationSubmitted,
        [Description("MaskRequestApproved.html")]
        MaskRequestApproved,
        [Description("MaskRequestDenied.html")]
        MaskRequestDenied,
        [Description("DonationOnItsWay.html")]
        DonationOnItsWay,
        [Description("Contact.html")]
        Contact,
        [Description("MaskDonationApproved.html")]
        MaskDonationApproved,
        [Description("MaskDonationRejected.html")]
        MaskDonationRejected,
        [Description("WasDonationReceived.html")]
        WasDonationReceived,
        [Description("MaskDonationReceived.html")]
        MaskDonationReceived,
        [Description("MaskDonationNotReceived.html")]
        MaskDonationNotReceived,
    }
}