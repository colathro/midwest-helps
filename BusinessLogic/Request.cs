using DB = getthehotdish.DataAccess;
using getthehotdish.Models;
using getthehotdish.Utils;
using getthehotdish.Utils.Enums;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace getthehotdish.BusinessLogic
{
    public class Request
    {
        public static async Task<MaskDonationModel> CreateMaskDonation (DB.DataContext dataContext, EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var maskDonation = await DB.MaskDonation.Create(dataContext, maskDonationModel);
            await SendDonationOnItsWayEmail(emailSettings, maskDonation);
            await EmailUtils.SendEmailAsync(emailSettings, EmailMessageType.MaskDonationSubmitted, "Your was submitted successfully", "Donation offer received", maskDonationModel.Donor.Email);
            return maskDonation;
        }
        public static async Task<MaskDonationModel> UpdateMaskDonationStatus(DB.DataContext dataContext, EmailSettings emailSettings, string status, Guid id)
        {
            var statusEnum = EnumUtils.GetValue<DB.DonationStatus>(status);
            var maskDonation = await DB.MaskDonation.UpdateStatus(dataContext, id, statusEnum);
            return maskDonation;
        }
        private static async Task SendDonationOnItsWayEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donor = maskDonationModel.Donor;

            var updateStatusLink = "midwesthelps.com/donationStatus";
            var donorCompany = !string.IsNullOrEmpty(donor.Company) ? $"<br />{donor.Company}" : "";

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.DonationOnItsWay));
            htmlMessageSB.Replace("{DonorName}", donor.Email)
                .Replace("{DonorEmail}", donor.Email)
                .Replace("{DonorPhone}", donor.Phone)
                .Replace("{DonorCompany}", donorCompany)
                .Replace("{MaskDetails}", getMaskDetailsForEmail(maskDonationModel.Donation))
                .Replace("{Status}", EnumUtils.GetName(DB.DonationStatus.Received))
                .Replace("{Id}", maskDonationModel.Id.ToString())
                .Replace("{ReceivedDonationLink}", updateStatusLink);
            await EmailUtils.SendEmailAsync(emailSettings, htmlMessageSB.ToString(), $"{maskDonationModel.Donor.Name} has a donation!", "You got a donation offer", recipient.Email);
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
