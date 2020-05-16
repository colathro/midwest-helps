using System;
using MimeKit;
using getthehotdish.Models;
using System.Text;
using System.IO;
using getthehotdish.Utils.Enums;
using System.Threading.Tasks;
using System.Net.Mail;
using System.Net;

namespace getthehotdish.Utils
{
    public class EmailUtils
    {
        private const string messageTemplatesPath = @"\Utils\HtmlTemplates\MessageTemplates\";
        private const string emailBodyFileName = @"\Utils\HtmlTemplates\EmailBody.html";
        private const string contactUsLinkKey = @"{ContactUsLink}";
        private const string siteLinkKey = @"{SiteLink}";
        private const string contactUsLink = @"https://midwesthelps.com/contact";
        private const string siteLink = @"https://midwesthelps.com/";
        private const string messageReplaceKey = @"{Message}";
        private const string titleReplaceKey = @"{Title}";
        public static async Task SendEmailAsync(EmailSettings emailSettings, string messageHtml, string title, string subject, string toEmail)
        {
            SendEmail(emailSettings, subject, await BuildHtmlMessage(messageHtml, title), toEmail);
        }
        public static async Task SendEmailAsync(EmailSettings emailSettings, EmailMessageType messageType, string title, string subject, string toEmail)
        {
            SendEmail(emailSettings, subject, await BuildHtmlMessage(messageType, title), toEmail);
        }
        //public static async Task SendEmailAsync(EmailSettings emailSettings, string messageHtml, string title, string subject, string toEmail, string toName)
        //{
        //    await SendEmailAsync(emailSettings, subject, await BuildHtmlBody(messageHtml, title), toName, toEmail);
        //}
        //public static async Task SendEmailAsync(EmailSettings emailSettings, EmailMessageType messageType, string title, string subject, string toEmail, string toName)
        //{
        //    await SendEmailAsync(emailSettings, subject, await BuildHtmlBody(messageType, title), toName, toEmail);
        //}
        public static async Task<string> GetEmailHTMLTemplate(EmailMessageType messageType)
        {
            return await File.ReadAllTextAsync(Directory.GetCurrentDirectory() + messageTemplatesPath + EnumUtils.GetDescription(messageType));
        }
        //private static async Task<MimeEntity> BuildHtmlBody(EmailMessageType messageType, string title)
        //{
        //    var htmlMessage = await GetEmailHTMLTemplate(messageType);
        //    var builder = new BodyBuilder();
        //    var sb = new StringBuilder(await File.ReadAllTextAsync(Directory.GetCurrentDirectory() + emailBodyFileName));
        //    sb.Replace(messageReplaceKey, htmlMessage)
        //        .Replace(titleReplaceKey, title)
        //        .Replace(contactUsLinkKey, contactUsLink)
        //        .Replace(siteLinkKey, siteLink);

        //    builder.HtmlBody = sb.ToString();

        //    return builder.ToMessageBody();
        //}
        //private static async Task<MimeEntity> BuildHtmlBody(string htmlMessage, string title)
        //{
        //    var builder = new BodyBuilder();
        //    var sb = new StringBuilder(await File.ReadAllTextAsync(Directory.GetCurrentDirectory() + emailBodyFileName));
        //    sb.Replace(messageReplaceKey, htmlMessage)
        //        .Replace(titleReplaceKey, title)
        //        .Replace(contactUsLinkKey, contactUsLink)
        //        .Replace(siteLinkKey, siteLink);

        //    builder.HtmlBody = sb.ToString();

        //    return builder.ToMessageBody();
        //}
        //private static async Task SendEmailAsync(EmailSettings emailSettings, string subject, MimeEntity mimeEntity, string toName, string toEmail)
        //{
        //    var mimeMessage = new MimeMessage();
        //    mimeMessage.From.Add(new MailboxAddress(emailSettings.Name, emailSettings.EmailSender));
        //    mimeMessage.To.Add(new MailboxAddress(toName, toEmail));
        //    mimeMessage.Subject = subject;
        //    mimeMessage.Body = mimeEntity;

        //    try
        //    {
        //        using var client = new SmtpClient();
        //        await client.ConnectAsync(emailSettings.SmtpClient, emailSettings.Port, SecureSocketOptions.StartTls);

        //        await client.AuthenticateAsync(emailSettings.EmailSender, emailSettings.EmailPassword);

        //        await client.SendAsync(mimeMessage);
        //        await client.DisconnectAsync(true);
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}
        private static async Task<string> BuildHtmlMessage(EmailMessageType messageType, string title)
        {
            var htmlMessage = await GetEmailHTMLTemplate(messageType);
            var sb = new StringBuilder(await File.ReadAllTextAsync(Directory.GetCurrentDirectory() + emailBodyFileName));
            sb.Replace(messageReplaceKey, htmlMessage)
                .Replace(titleReplaceKey, title)
                .Replace(contactUsLinkKey, contactUsLink)
                .Replace(siteLinkKey, siteLink);

            return sb.ToString();
        }

        private static async Task<string> BuildHtmlMessage(string htmlMessage, string title)
        {
            var sb = new StringBuilder(await File.ReadAllTextAsync(Directory.GetCurrentDirectory() + emailBodyFileName));
            sb.Replace(messageReplaceKey, htmlMessage)
                .Replace(titleReplaceKey, title)
                .Replace(contactUsLinkKey, contactUsLink)
                .Replace(siteLinkKey, siteLink);

            return sb.ToString();
        }
        private static void SendEmail(EmailSettings emailSettings, string subject, string htmlMessage, string toEmail)
        {
            var message = new MailMessage(emailSettings.EmailSender, toEmail, subject, htmlMessage);
            message.BodyEncoding = Encoding.UTF8;
            message.IsBodyHtml = true;

            try
            {
                using var client = new SmtpClient(emailSettings.SmtpClient)
                {
                    Host = emailSettings.SmtpClient,
                    Port = emailSettings.Port,
                    EnableSsl = false,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(emailSettings.EmailSender, emailSettings.EmailPassword),
                    
                };
                
                client.Send(message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}
