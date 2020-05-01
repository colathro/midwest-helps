using System;

namespace getthehotdish.DataAccess
{
    [Flags]
    public enum BusinessChannelType
    {
        None = 0,
        CurbSide = 1,
        TakeOut = 2,
        DriveThru = 4,
        Delivery = 8,
        LiveStream = 16,
        Appointment = 32
    }
}