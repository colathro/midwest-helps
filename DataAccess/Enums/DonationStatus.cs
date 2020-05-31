using System;

namespace getthehotdish.DataAccess
{
    public enum DonationStatus
    {
        Initial = 0,
        Approved,
        Rejected,
        Received,
        PartiallyReceived,
        NotReceived
    }
}