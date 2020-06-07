using System;
using SendGrid;
using SendGrid.Helpers.Mail;
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
        private static readonly string messageTemplatesPath = $"{Path.DirectorySeparatorChar}Utils{Path.DirectorySeparatorChar}HtmlTemplates{Path.DirectorySeparatorChar}MessageTemplates{Path.DirectorySeparatorChar}";
        private static readonly string emailBodyFileName = $"{Path.DirectorySeparatorChar}Utils{Path.DirectorySeparatorChar}HtmlTemplates{Path.DirectorySeparatorChar}EmailBody.html";
        private const string contactUsLinkKey = @"{ContactUsLink}";
        private const string siteLinkKey = @"{SiteLink}";
        private const string contactUsLink = @"https://midwesthelps.com/contact";
        private const string siteLink = @"https://midwesthelps.com/";
        private const string messageReplaceKey = @"{Message}";
        private const string titleReplaceKey = @"{Title}";
        public static async Task SendEmailAsync(EmailSettings emailSettings, string messageHtml, string title, string subject, string toEmail, string name = "Valued User")
        {
            await SendEmail(emailSettings, subject, await BuildHtmlMessage(messageHtml, title), toEmail, name);
        }
        public static async Task SendEmailAsync(EmailSettings emailSettings, EmailMessageType messageType, string title, string subject, string toEmail, string name = "Valued User", int titleFontSize = 30)
        {
            await SendEmail(emailSettings, subject, await BuildHtmlMessage(messageType, title), toEmail, name);
        }
        public static async Task<string> GetEmailHTMLTemplate(EmailMessageType messageType)
        {
            return await File.ReadAllTextAsync(Directory.GetCurrentDirectory() + messageTemplatesPath + EnumUtils.GetDescription(messageType));
        }
        private static async Task<string> BuildHtmlMessage(EmailMessageType messageType, string title)
        {
            var htmlMessage = await GetEmailHTMLTemplate(messageType);
            return await BuildHtmlMessage(htmlMessage, title);
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
        private static async Task SendEmail(EmailSettings emailSettings, string subject, string htmlMessage, string toEmail, string name)
        {
            var client = new SendGridClient(emailSettings.EmailPassword);
            var from = new EmailAddress(emailSettings.EmailSender, "MidwestHelps Support");
            var to = new EmailAddress(toEmail, name);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, "", htmlMessage);
            var response = await client.SendEmailAsync(msg);
        }

    }
}
