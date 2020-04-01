using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using MimeKit;
using MailKit.Net.Smtp;
using getthehotdish.Models;
using Microsoft.Extensions.Logging;

namespace getthehotdish.Controllers
{
    public class NotificationController : Controller
    {
        private readonly ILogger<ListingController> _logger;
        private readonly NotificationSettings _notificationSettings;

        public NotificationController(ILogger<ListingController> logger, IOptions<NotificationSettings> notificationSettingsAccessor)
        {
            _logger = logger;
            _notificationSettings = notificationSettingsAccessor.Value;
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
            SendEmail($"Your have a message from {senderName}", BuildMessageReceivedMessage(senderName, senderEmail, message), _notificationSettings.EmailNotificationSettings.Name, _notificationSettings.EmailNotificationSettings.EmailSender);
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

        private void SendEmail(string subject, MimeEntity mimeEntity, string toName, string toEmail)
        {
            var mimeMessage = new MimeMessage();
            mimeMessage.From.Add(new MailboxAddress(_notificationSettings.EmailNotificationSettings.Name, _notificationSettings.EmailNotificationSettings.EmailSender));
            mimeMessage.To.Add(new MailboxAddress(toName, toEmail));
            mimeMessage.Subject = subject;
            mimeMessage.Body = mimeEntity;

            try
            {
                using var client = new SmtpClient();
                client.Connect(_notificationSettings.EmailNotificationSettings.SmtpClient, _notificationSettings.EmailNotificationSettings.Port, false);

                client.Authenticate(_notificationSettings.EmailNotificationSettings.EmailSender, _notificationSettings.EmailNotificationSettings.EmailPassword);

                client.Send(mimeMessage);
                client.Disconnect(true);
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"MESSAGE NOT DELIVERED. Message: {mimeMessage}", ex);
                throw ex;
            }
        }
    }
}