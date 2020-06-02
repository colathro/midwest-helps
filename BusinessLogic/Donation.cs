using getthehotdish.DataAccess;
using getthehotdish.Models;
using getthehotdish.Utils;
using getthehotdish.Utils.Enums;
using System.Text;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace getthehotdish.BusinessLogic
{
    public class Donation
    {
        public static async Task<MaskDonationModel> CreateMaskDonation (DataContext dataContext, EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var maskDonation = await MaskDonation.Create(dataContext, maskDonationModel);
            await SendDonationOnItsWayEmail(emailSettings, maskDonation);
            await EmailUtils.SendEmailAsync(emailSettings, EmailMessageType.MaskDonationSubmitted, "Your donation was submitted successfully", "Donation offer received", maskDonationModel.Donor.Email);
            return maskDonation;
        }
        public static async Task<MaskDonationModel> UpdateMaskDonationStatus(DataContext dataContext, string status, Guid id)
        {
            var statusEnum = EnumUtils.GetValue<DonationStatus>(status);
            var maskDonation = await MaskDonation.UpdateStatus(dataContext, id, statusEnum);
            if (statusEnum == DonationStatus.Received)
            {
                await AddDonatedMasksToAggregate(dataContext, maskDonation);
            }
            return maskDonation;
        }
        private static async Task SendDonationOnItsWayEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donor = maskDonationModel.Donor;

            var updateStatusLink = "midwesthelps.com/donationStatus";
            var donorCompany = !string.IsNullOrEmpty(donor.Company) ? $"<br />{donor.Company}" : "";

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.DonationOnItsWay));
            htmlMessageSB.Replace("{DonorName}", donor.Name)
                .Replace("{DonorEmail}", donor.Email)
                .Replace("{DonorPhone}", donor.Phone)
                .Replace("{DonorCompany}", donorCompany)
                .Replace("{MaskDetails}", getMaskDetailsForEmail(maskDonationModel.Donation))
                .Replace("{Status}", EnumUtils.GetName(DonationStatus.Received))
                .Replace("{Id}", maskDonationModel.Id.ToString())
                .Replace("{ReceivedDonationLink}", updateStatusLink);
            await EmailUtils.SendEmailAsync(emailSettings, htmlMessageSB.ToString(), $"{maskDonationModel.Donor.Name} has a donation!", "You got a donation offer", recipient.Email);
        }
        private static async Task AddDonatedMasksToAggregate(DataContext dataContext, MaskDonationModel maskDonationModel)
        {
            foreach (var mask in maskDonationModel.Donation)
            {
                await Aggregate.AddToAggregate(dataContext, "Donated " + mask.Type, mask.Quantity);
            }
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
