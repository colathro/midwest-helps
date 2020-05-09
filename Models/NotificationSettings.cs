using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.Models
{
    public class EmailSettings
    {
        public string SmtpClient { get; set; }
        public int Port { get; set; }
        public string Name { get; set; }
        public string EmailSender { get; set; }
        public string EmailPassword { get; set; }

        public EmailSettings()
        {

        }

        public EmailSettings(string smtpClient, int port, string name, string emailSender, string emailPassword)
        {
            SmtpClient = smtpClient;
            Port = port;
            Name = name;
            EmailSender = emailSender;
            EmailPassword = emailPassword;
        }
    }
}
