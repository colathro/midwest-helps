using System;
using System.ComponentModel;

namespace getthehotdish.Models
{
    /// <summary>
    /// Enum for all handled errors
    /// </summary>
    public enum ErrorCode
    {
        [Description("{0}")]
        InvalidField = 1,
        [Description("Bad key")]
        BadKey = 2,
    }
}