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
    public class MaskDonation
    {
        public static async Task<MaskDonationModel> Create (DB.DataContext dataContext, EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var maskDonation = await DB.MaskDonation.Create(dataContext, maskDonationModel);
            await SendDonationOnItsWayEmail(emailSettings, maskDonation);
            await EmailUtils.SendEmailAsync(emailSettings, EmailMessageType.MaskDonationSubmitted, "Your donation is in review", "Donation in review", maskDonationModel.Donor.Email);
            return maskDonation;
        }
        public static async Task<MaskDonationModel> UpdateStatus(DB.DataContext dataContext, EmailSettings emailSettings, string status, Guid id, string reason = "")
        {
            var statusEnum = EnumUtils.GetValue<DB.DonationStatus>(status);
            var maskDonation = await DB.MaskDonation.UpdateStatus(dataContext, id, statusEnum);
            switch (statusEnum)
            {
                case DB.DonationStatus.Approved:
                    await SendMaskDonationApprovedEmail(emailSettings, maskDonation);
                    await SendWasDonationReceivedEmail(emailSettings, maskDonation);
                    break;
                case DB.DonationStatus.Rejected:
                    await SendMaskDonationRejectedEmail(emailSettings, maskDonation, reason);
                    break;
                case DB.DonationStatus.PartiallyReceived:
                    break;
                case DB.DonationStatus.Received:
                    await SendMaskDonationReceivedEmail(emailSettings, maskDonation);
                    break;
                case DB.DonationStatus.NotReceived:
                    await SendMaskDonationNotReceivedEmail(emailSettings, maskDonation);
                    break;
                default:
                    break;

            }
            return maskDonation;
        }
        private static async Task SendDonationOnItsWayEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donor = maskDonationModel.Donor;

            var updateStatusLink = "midwesthelps.com/donationStatus";
            var rejectDonationLink = $"midwesthelps.com/donationStatus?{EnumUtils.GetName(DB.DonationStatus.Rejected)}&id={maskDonationModel.Id}";

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.DonationOnItsWay));
            htmlMessageSB.Replace("{DonorEmail}", donor.Email)
                .Replace("{DonorPhone}", donor.Phone)
                .Replace("{MaskDetails}", getMaskDetailsForEmail(maskDonationModel.Donation))
                .Replace("{RejectDonationLink}", rejectDonationLink)
                .Replace("{Status}", EnumUtils.GetName(DB.DonationStatus.Approved))
                .Replace("{Id}", maskDonationModel.Id.ToString())
                .Replace("{AcceptDonationLink}", updateStatusLink);
            await EmailUtils.SendEmailAsync(emailSettings, htmlMessageSB.ToString(), $"{maskDonationModel.Donor.Name} has a donation!", "Donation on its way", recipient.Email);
        }
        private static async Task SendMaskDonationApprovedEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donor = maskDonationModel.Donor;
            var maskDetails = getMaskDetailsForEmail(maskDonationModel.Donation);

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.MaskDonationApproved));
            htmlMessageSB.Replace("{RecipientName}", recipient.Name)
                .Replace("{RecipientEmail}", recipient.Email)
                .Replace("{RecipientPhone}", recipient.Phone)
                .Replace("{Message}", getDeliveryInstructions(maskDonationModel.Request.Delivery))
                .Replace("{MaskDetails}", maskDetails);
            await EmailUtils.SendEmailAsync(emailSettings, htmlMessageSB.ToString(), $"Your donation has been approved", "Donation Approved", donor.Email);
        }

        private static async Task SendWasDonationReceivedEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donor = maskDonationModel.Donor;

            var updateStatusLink = "midwesthelps.com/donationStatus";
            var notReceivedDonationLink = $"midwesthelps.com/donationStatus?{EnumUtils.GetName(DB.DonationStatus.NotReceived)}&id={maskDonationModel.Id}";

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.MaskDonationApproved));
            htmlMessageSB.Replace("{DonorEmail}", donor.Name)
                .Replace("{DonorEmail}", donor.Email)
                .Replace("{DonorPhone}", donor.Phone)
                .Replace("{MaskDetails}", getMaskDetailsForEmail(maskDonationModel.Donation))
                .Replace("{NotReceivedDonationLink}", notReceivedDonationLink)
                .Replace("{Status}", EnumUtils.GetName(DB.DonationStatus.Received))
                .Replace("{Id}", maskDonationModel.Id.ToString())
                .Replace("{AcceptDonationLink}", updateStatusLink); ;
            await EmailUtils.SendEmailAsync(emailSettings, htmlMessageSB.ToString(), $"Let us know when you receive your donation", "Have you received your donation?", recipient.Email);
        }

        private static async Task SendMaskDonationRejectedEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel, string reason)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donor = maskDonationModel.Donor;

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.DonationOnItsWay));
            htmlMessageSB.Replace("{RecipientName}", recipient.Name)
                .Replace("{Message}", reason);
            await EmailUtils.SendEmailAsync(emailSettings, EmailMessageType.MaskDonationRejected, "We’re sorry, your donation was not accepted.", "Donation not accepted", donor.Email);
        }

        private static async Task SendMaskDonationReceivedEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donor = maskDonationModel.Donor;

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.DonationOnItsWay));
            htmlMessageSB.Replace("{RecipientName}", recipient.Name);
            await EmailUtils.SendEmailAsync(emailSettings, EmailMessageType.MaskDonationReceived, "Your donation was received", "Donation received", donor.Email);
        }

        private static async Task SendMaskDonationNotReceivedEmail(EmailSettings emailSettings, MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donor = maskDonationModel.Donor;

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.DonationOnItsWay));
            htmlMessageSB.Replace("{RecipientName}", recipient.Name);
            await EmailUtils.SendEmailAsync(emailSettings, EmailMessageType.MaskDonationNotReceived, "Your donation was not received", "Donation not received", donor.Email);
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

        private static string getDeliveryInstructions(DeliveryModel delivery)
        {
            var sb = new StringBuilder();
            foreach (var address in delivery.Addresses)
            {
                if (EnumUtils.GetValue<DB.AddressType>(address.Type) == DB.AddressType.DropOff)
                {
                    sb.Append($"Drop-off masks at {address.ToUSFormat()}.");
                } 
                else
                {
                    sb.Append($"Mail masks to {address.ToUSFormat()}.");
                }
                sb.Append("<br />");
            }

            sb.Append($"<i>{delivery.Notes}</i>");

            return sb.ToString();
        }
    }
}
