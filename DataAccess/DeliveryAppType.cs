using System;

namespace getthehotdish.DataAccess
{
    [Flags]
    public enum DeliveryAppType
    {
        None = 0,
        UberEats = 1,
        Grubhub = 2,
        DoorDash = 4,
        Postmates = 8,
        FoodDudes = 16,
        BiteSquad = 32
    }
}