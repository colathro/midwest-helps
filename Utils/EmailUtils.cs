using System;
using MimeKit;
using MailKit.Net.Smtp;
using getthehotdish.Models;
using MailKit.Security;

namespace getthehotdish.Utils
{
    public class EmailUtils
    {
        public void SendEmailAsync(EmailSettings emailSettings, string subject, string toEmail, string title, string message)
        {

        }
        private void SendEmail(EmailSettings emailSettings, string subject, MimeEntity mimeEntity, string toName, string toEmail)
        {
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress(emailSettings.Name, emailSettings.EmailSender));
            mimeMessage.To.Add(new MailboxAddress(toName, toEmail));
            mimeMessage.Subject = subject;
            mimeMessage.Body = mimeEntity;

            try
            {
                using var client = new SmtpClient();
                client.Connect(emailSettings.SmtpClient, emailSettings.Port, SecureSocketOptions.StartTls);

                client.Authenticate(emailSettings.EmailSender, emailSettings.EmailPassword);

                client.Send(mimeMessage);
                client.Disconnect(true);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
