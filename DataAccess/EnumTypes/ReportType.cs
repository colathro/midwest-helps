using System;

namespace getthehotdish.DataAccess
{
    [Flags]
    public enum ReportType
    {
        innacurate = 1,
        spam = 2,
        offensive = 3
    }
}