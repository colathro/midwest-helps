using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Mvc;
using getthehotdish.DataAccess;
using Microsoft.AspNetCore.Authorization;
using getthehotdish.Utils;
using getthehotdish.Utils.Enums;
using getthehotdish.BusinessLogic;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskRequestController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private EmailSettings _emailSettings;

        public MaskRequestController(DataContext dataContext, EmailSettings emailSettings)
        {
            _dataContext = dataContext;
            _emailSettings = emailSettings;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaskRequestModel>>> List()
        {
            return await MaskRequest.GetAllApprovedModel(_dataContext, true);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaskRequestModel>> Get(Guid id)
        {
            return await MaskRequest.GetModel(_dataContext, id);
        }

        [HttpGet]
        [Route("page/{page}")]
        public async Task<ICollection<MaskRequestModel>> Get(int page, [FromQuery] int maskType = -1)
        {
            return await MaskRequest.GetPagedMaskType(_dataContext, maskType, page);
        }

        [HttpPost]
        public async Task<ActionResult<MaskRequestModel>> Post(MaskRequestModel maskRequestModel)
        {
            var toReturn = await MaskRequest.Create(_dataContext, maskRequestModel);
            _ = EmailUtils.SendEmailAsync(_emailSettings, EmailMessageType.MaskRequestSubmitted, "Your mask request is in review", "Request in review", maskRequestModel.Recipient.Email);
            return toReturn;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MaskRequestModel>> Put(Guid id, [FromBody] MaskRequestModel maskRequestModel)
        {
            return await MaskRequest.Update(_dataContext, id, maskRequestModel);
        }

        [HttpGet("total")]
        public async Task<ActionResult<AggregateTotalModel>> GetAggregate()
        {
            return new AggregateTotalModel
            {
                Requested = await MaskRequest.GetRequestAggregateCount(this._dataContext),
                Donated = await MaskRequest.GetDonatedAggregateCount(this._dataContext)
            };
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(Guid id)
        {
            await MaskRequest.Delete(_dataContext, id);
            return Ok();
        }

        [HttpGet("approvals/get")]
        [Authorize]
        public async Task<ICollection<MaskRequestModel>> GetApprovals()
        {
            return await MaskRequest.GetAllApprovedModel(_dataContext, false);
        }

        [HttpPost("approvals/approve/{post}")]
        [Authorize]
        public async Task<ActionResult<MaskRequestModel>> Approve(string post)
        {
            return await Admin.ApproveMaskRequest(_emailSettings, _dataContext, Guid.Parse(post));
        }

        [HttpPost("approvals/deny/{post}")]
        [Authorize]
        public async Task<ActionResult<bool>> Deny(string post, string reason = "")
        {
            return await Admin.DenyMaskRequest(_emailSettings, _dataContext, Guid.Parse(post), reason);
        }
    }
}
