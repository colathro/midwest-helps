using System;

namespace getthehotdish.DataAccess
{
    [Flags]
    public enum MaskType
    {
        None = 0,
        Fabric = 1,
        FaceShield = 2,
        EarGuards = 4,
        ScrubCaps = 8,
        Other = 16
    }
}