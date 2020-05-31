using DB = getthehotdish.DataAccess;
using getthehotdish.Models;
using getthehotdish.Utils;
using getthehotdish.Utils.Enums;
using System.Text;
using System.Threading.Tasks;
using System;
using getthehotdish.DataAccess;
using System.Collections.Generic;

namespace getthehotdish.BusinessLogic
{
    public class MaskDonation
    {
        public static async Task<MaskDonationModel> Create (DB.DataContext dataContext, EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var maskDonation = await DB.MaskDonation.Create(dataContext, maskDonationModel);
            await SendDonationOnItsWayEmail(emailSettings, maskDonation);
            return maskDonation;
        }
        public static async Task<MaskDonationModel> UpdateStatus(DB.DataContext dataContext, EmailSettings emailSettings, string status, Guid id)
        {
            var statusEnum = EnumUtils.GetValue<DB.DonationStatus>(status);
            var maskDonation = await DB.MaskDonation.UpdateStatus(dataContext, id, statusEnum);
            switch (statusEnum)
            {
                case DB.DonationStatus.Approved:
                    await SendMaskDonationApprovedEmail(emailSettings, maskDonation);
                    break;
                case DB.DonationStatus.Rejected:
                    break;
                case DB.DonationStatus.PartiallyReceived:
                    break;
                case DB.DonationStatus.Received:
                    break;
                case DB.DonationStatus.NotReceived:
                    break;
                default:
                    break;

            }
            return maskDonation;
        }
        private static async Task SendDonationOnItsWayEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donator = maskDonationModel.Donor;
            var maskDetails = getMaskDetailsForEmail(maskDonationModel.Donation);

            var updateStatusLink = "midwesthelps.com/donationStatus";

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.DonationOnItsWay));
            htmlMessageSB.Replace("{DonatorEmail}", donator.Email)
                .Replace("{DonatorPhone}", donator.Phone)
                .Replace("{MaskDetails}", maskDetails)
                .Replace("{Status}", "Received")
                .Replace("{Id}", maskDonationModel.Id.ToString())
                .Replace("{UpdateStatusLink}", updateStatusLink);
            await EmailUtils.SendEmailAsync(emailSettings, htmlMessageSB.ToString(), $"{maskDonationModel.Donor.Name} has a donation!", "Donation on its way", recipient.Email);
        }
        private static async Task SendMaskDonationApprovedEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donor = maskDonationModel.Donor;
            var maskDetails = getMaskDetailsForEmail(maskDonationModel.Donation);

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.DonationOnItsWay));
            htmlMessageSB.Replace("{RecipientName}", recipient.Name)
                .Replace("{RecipientEmail}", recipient.Email)
                .Replace("{RecipientPhone}", recipient.Phone)
                .Replace("{Message}", "Message")
                .Replace("{MaskDetails}", maskDetails);
            await EmailUtils.SendEmailAsync(emailSettings, htmlMessageSB.ToString(), $"Your donation has been approved", "Donation Approved", donor.Email);
        }

        private static string getMaskDetailsForEmail(List<MaskInfoModel> masks)
        {
            var maskDetailsSB = new StringBuilder();

            foreach (var mask in masks)
            {
                var maskInfo = mask.ToMaskInfo();
                maskDetailsSB.Append($"<b>• {maskInfo.Quantity} {EnumUtils.GetDescription(maskInfo.Type)}</b><br />");
            }

            return maskDetailsSB.ToString();
        }
    }
}
