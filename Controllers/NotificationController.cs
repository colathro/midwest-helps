using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using getthehotdish.Models;
using Microsoft.Extensions.Logging;
using getthehotdish.DataAccess;
using MailKit.Security;

namespace getthehotdish.Controllers
{
    public class NotificationController : Controller
    {
        private readonly EmailSettings _emailSettings;

        public NotificationController(IOptions<EmailSettings> notificationSettingsAccessor)
        {
            _emailSettings = notificationSettingsAccessor.Value;
        }

        /// <summary>
        /// Send an email to the organization.
        /// </summary>
        /// <param name="senderName">The sender name</param>
        /// <param name="senderEmail">The sender email</param>
        /// <param name="message">The message to be added in the email</param>
        /// <returns>True, if the message was sent. False, otherwise.</returns>
        public Task<bool> SendMessageReceivedEmailAsync(string senderName, string senderEmail,  string message)
        {
            SendEmail($"Your have a message from {senderName}", BuildMessageReceivedMessage(senderName, senderEmail, message), _emailSettings.Name, _emailSettings.EmailSender);
            return Task.FromResult(true);
        }

        /// <summary>
        /// Send an email to the organization based on a user report.
        /// </summary>
        /// <param name="budiness">The business for which the report is being received.</param>
        /// <param name="reportType">The type of report being received</param>
        /// <returns>True, if the message was sent. False, otherwise.</returns>
        public Task<bool> SendReportReceivedEmailAsync(BusinessModel business, ReportType reportType)
        {
            SendEmail($"You have a report about {business.Name} ({business.Id}) of type {reportType}", BuildReportReceivedMessage(business, reportType), _emailSettings.Name, _emailSettings.EmailSender);
            return Task.FromResult(true);
        }

        private MimeEntity BuildMessageReceivedMessage(string senderName, string senderEmail, string message)
        {
            var builder = new BodyBuilder();

            builder.HtmlBody = string.Format(@"<p>Hi team,<br>
                                <p>A message was sent by {0} ({1}) on the Hotdish portal.<br>
                                <p>{0} says:{2}
                                <br>
                                {2}
                                <br>
                                <p>Don't forget to reach out to them and provide assistance.", senderName, senderEmail, message);

            return builder.ToMessageBody();
        }

        private MimeEntity BuildReportReceivedMessage(BusinessModel business, ReportType reportType)
        {
            var builder = new BodyBuilder();

            builder.HtmlBody = string.Format(@"<p>Hi team,<br>
                                <p>A report was sent regarding post for business {0} ({1}) on the Hotdish portal.<br>
                                <p>Report type: {2}
                                <br>
                                <p>Please look into this business posting.", business.Name, business.Id, reportType);

            return builder.ToMessageBody();
        }

        private void SendEmail(string subject, MimeEntity mimeEntity, string toName, string toEmail)
        {
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress(_emailSettings.Name, _emailSettings.EmailSender));
            mimeMessage.To.Add(new MailboxAddress(toName, toEmail));
            mimeMessage.Subject = subject;
            mimeMessage.Body = mimeEntity;

            try
            {
                using var client = new SmtpClient();
                client.Connect(_emailSettings.SmtpClient, _emailSettings.Port, SecureSocketOptions.StartTls);

                client.Authenticate(_emailSettings.EmailSender, _emailSettings.EmailPassword);

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