using System;
using System.ComponentModel;

namespace getthehotdish.DataAccess
{
    public enum MaskType
    {
        [Description("Fabric")]
        Fabric = 1,
        [Description("Face shield")]
        FaceShield = 2,
        [Description("Ear guards")]
        EarGuards = 3,
        [Description("Scrub caps")]
        ScrubCaps = 4,
        [Description("Others")]
        Other = 5
    }
}