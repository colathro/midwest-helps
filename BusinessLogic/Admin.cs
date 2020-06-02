using DB = getthehotdish.DataAccess;
using getthehotdish.Models;
using getthehotdish.Utils;
using getthehotdish.Utils.Enums;
using System.Text;
using System.Threading.Tasks;
using System;
using getthehotdish.DataAccess;
using getthehotdish.Handlers.Exceptions;

namespace getthehotdish.BusinessLogic
{
    public class Admin
    {
        public async static Task<MaskRequestModel> ApproveMaskRequest(EmailSettings emailSettings, DataContext dataContext, Guid id)
        {
            var newMaskRequest = await MaskRequest.GetApproved(dataContext, id, false);
            if (newMaskRequest == null)
            {
                throw new ErrorModelException(ErrorCode.NotFound, "Request");
            }

            await MaskRequest.UpdateOriginalId(dataContext, newMaskRequest.OriginalId, newMaskRequest.Id);

            newMaskRequest.Approved = true;

            await dataContext.SaveChangesAsync();

            await AddRequestedMasksToAggregate(dataContext, newMaskRequest);

            var maskRequestModel = newMaskRequest.ToMaskRequestModel();

            await EmailUtils.SendEmailAsync(emailSettings, EmailMessageType.MaskRequestApproved, "Your mask request is approved!", "Mask request approved", maskRequestModel.Recipient.Email);

            return maskRequestModel;
        }

        public async static Task<bool> DenyMaskRequest(EmailSettings emailSettings, DataContext dataContext, Guid id, string reason = "")
        {
            var maskRequest = await MaskRequest.GetApproved(dataContext, id, false);

            if (maskRequest != null)
            {
                dataContext.Remove(maskRequest);
                await dataContext.SaveChangesAsync();
            }

            await SendMaskRequestDeniedEmail(emailSettings, maskRequest.ToMaskRequestModel(), reason);

            return true;
        }
        private static async Task AddRequestedMasksToAggregate(DataContext dataContext, MaskRequest maskRequest)
        {
            foreach (var mask in maskRequest.MaskDetails.Masks)
            {
                await Aggregate.AddToAggregate(dataContext, "Requested " + mask.Type.ToString(), mask.Quantity);
            }
        }

        private static async Task SendMaskRequestDeniedEmail(EmailSettings emailSettings, MaskRequestModel maskRequestModel, string message = "")
        {
            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.MaskRequestDenied));
            htmlMessageSB.Replace("{Message}", !string.IsNullOrEmpty(message) ? message : @"We’re sorry, we’re not able to list your request.<br />Your request does not meet the requirements.<br />Please, for more details visit https://midwesthelps.com/resources. <br />Thank you!");
            await EmailUtils.SendEmailAsync(emailSettings, htmlMessageSB.ToString(), "We’re sorry, we’re not able to list your request", "Mask request denied", maskRequestModel.Recipient.Email);
        }
    }
}
