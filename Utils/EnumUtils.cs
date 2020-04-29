using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.Utils
{
    public class EnumUtils
    {
        public static IEnumerable<T> GetValues<T>()
        {
            return Enum.GetValues(typeof(T)).Cast<T>();
        }

        public static T GetEnumFlag<T>(IEnumerable<string> enumNameList) where T : struct, Enum
        {
            return Enum.TryParse<T>(String.Join(',', enumNameList), out var enumFlag) ? enumFlag : default;
        }

        public static T GetEnum<T>(string enumName) where T : struct, Enum
        {
            return Enum.TryParse<T>(enumName, out var enumValue) ? enumValue : default;
        }
    }
}
