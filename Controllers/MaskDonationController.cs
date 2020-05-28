using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Mvc;
using getthehotdish.DataAccess;
using getthehotdish.Utils;
using getthehotdish.Utils.Enums;
using System.Text;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskDonationController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private readonly EmailSettings _emailSettings;

        public MaskDonationController(DataContext dataContext, EmailSettings emailSettings)
        {
            _dataContext = dataContext;
            _emailSettings = emailSettings;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaskDonationModel>>> List()
        {
            return await MaskDonation.GetAllModel(_dataContext);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaskDonationModel>> Get(Guid id)
        {
            return await MaskDonation.GetModel(_dataContext, id);
        }

        [HttpPost]
        public async Task<ActionResult<MaskDonationModel>> Post(MaskDonationModel maskDonationModel)
        {
            var toReturn = await MaskDonation.Create(_dataContext, maskDonationModel);
            _ = SendDonationOnItsWayEmail(toReturn);
            return toReturn;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MaskDonationModel>> Put(Guid id, [FromBody] MaskDonationModel maskDonationModel)
        {
            return await MaskDonation.Update(_dataContext, id, maskDonationModel);
        }

        [HttpPost("updateStatus/{status}/{id}")]
        public async Task<ActionResult<MaskDonationModel>> UpdateStatus(string status, Guid id)
        {
            return await MaskDonation.UpdateStatus(_dataContext, id, EnumUtils.GetValue<DonationStatus>(status));
        }

        private async Task SendDonationOnItsWayEmail(MaskDonationModel maskDonationModel)
        {
            var recipient = maskDonationModel.Request.Recipient;
            var donator = maskDonationModel.Donator;
            var maskDetailsSB = new StringBuilder("");

            foreach (var donation in maskDonationModel.Donation)
            {
                var maskInfo = donation.ToMaskInfo();
                maskDetailsSB.Append($"<b>• {maskInfo.Quantity} {EnumUtils.GetDescription(maskInfo.Type)}</b><br />");
            }

            var updateStatusLink = "midwesthelps.com/donationStatus";

            var htmlMessageSB = new StringBuilder(await EmailUtils.GetEmailHTMLTemplate(EmailMessageType.DonationOnItsWay));
            htmlMessageSB.Replace("{DonatorEmail}", donator.Email)
                .Replace("{DonatorPhone}", donator.Phone)
                .Replace("{MaskDetails}", maskDetailsSB.ToString())
                .Replace("{Status}", "Received")
                .Replace("{Id}", maskDonationModel.Id.ToString())
                .Replace("{UpdateStatusLink}", updateStatusLink);
            await EmailUtils.SendEmailAsync(_emailSettings, htmlMessageSB.ToString(), $"{maskDonationModel.Donator.Name} has a donation!", "Donation on its way", recipient.Email);
        }
    }
}
