﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace getthehotdish.Utils
{
    public class EnumUtils
    {
        public static IEnumerable<T> GetValues<T>()
        {
            return Enum.GetValues(typeof(T)).Cast<T>();
        }

        public static string GetName<T>(T enumValue) where T : struct, Enum
        {
            return Enum.GetName(typeof(T), enumValue);
        }

        public static T GetEnumFlag<T>(IEnumerable<string> enumNameList) where T : struct, Enum
        {
            return Enum.TryParse<T>(String.Join(',', enumNameList), out var enumFlag) ? enumFlag : default;
        }

        public static IEnumerable<string> GetEnumNameList<T>(T enumNameList) where T : struct, Enum
        {
            return enumNameList
                .ToString()
                .Split(new[] { "," }, StringSplitOptions.RemoveEmptyEntries)
                .Select(s => s.Trim())
                .ToList();
        }

        public static T GetEnum<T>(string enumName) where T : struct, Enum
        {
            return Enum.TryParse<T>(enumName, out var enumValue) ? enumValue : default;
        }
    }
}
