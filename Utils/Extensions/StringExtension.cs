using System;
using System.Text.RegularExpressions;

namespace getthehotdish.Utils.Extensions
{
    public static class StringExtension
    {
        public static string ToPhoneFormat(this string value)
        {
            value = value.RemoveNonDigits();
            if (value.Length < 10)
            {
                return value;
            }

            return Regex.Replace(value.Substring(0,10), @"(\d{3})(\d{3})(\d{4})", "$1-$2-$3");
        }

        public static string RemoveNonDigits(this string value)
        {
            return Regex.Replace(value, "[^.0-9]", "");
        }
    }
}
