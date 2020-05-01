using getthehotdish.Utils;
using System;
using System.Linq;

namespace getthehotdish.Models
{
    public class ErrorModel
    {
        public string Code { get; set; }
        public string Message { get; set; }

        public ErrorModel()
        {
        }

        public ErrorModel(ErrorCode errorCode, params string[] parameters)
        {
            Code = ((int)errorCode).ToString("00000000");
            Message = string.Format(EnumUtils.GetDescription(errorCode), parameters);
        }

        public ErrorModel(string errorMessage)
        {
            Code = CodeGenerator.RandomString(8);
            Message = errorMessage;
        }
    }

    internal class CodeGenerator
    {
        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}
