using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.Models
{
    public class NotificationSettings
    {
        public EmailNotificationSettings EmailNotificationSettings { get; set; }
    }

    public class EmailNotificationSettings
    {
        public string SmtpClient { get; set; }
        public int Port { get; set; }
        public string Name { get; set; }
        public string EmailSender { get; set; }
        public string EmailPassword { get; set; }
    }
}
