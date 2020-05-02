using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;

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

        public static T GetValue<T>(string enumName) where T : struct, Enum
        {
            return Enum.TryParse<T>(enumName, out var enumValue) ? enumValue : default;
        }

        public static string GetDescription(Enum value)
        {
            Type type = value.GetType();
            string name = Enum.GetName(type, value);
            if (name != null)
            {
                FieldInfo field = type.GetField(name);
                if (field != null)
                {
                    DescriptionAttribute attr =
                           Attribute.GetCustomAttribute(field,
                             typeof(DescriptionAttribute)) as DescriptionAttribute;
                    if (attr != null)
                    {
                        return attr.Description;
                    }
                }
            }
            return null;
        }
    }
}
