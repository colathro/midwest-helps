using System;
using System.ComponentModel;

namespace getthehotdish.Utils.Enums
{
    public enum EmailMessageType
    {
        [Description("Your mask request is in review")]
        MaskRequestSubmitted = 1,
        [Description("Your mask request is approved")]
        MaskRequestApproved = 2,
        [Description("We're sorry, we're not able to list your request")]
        MaskRequestDenied = 3,
        [Description("{0} has a donation")]
        DonationOnItsWay = 4
    }
}