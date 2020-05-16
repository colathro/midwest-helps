using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Mvc;
using getthehotdish.DataAccess;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Authorization;
using getthehotdish.Handlers.Exceptions;
using getthehotdish.Utils;
using getthehotdish.Utils.Enums;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskRequestController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private AdminSettings _adminSettings;
        private EmailSettings _emailSettings;

        public MaskRequestController(DataContext dataContext, AdminSettings adminSettings, EmailSettings emailSettings)
        {
            _dataContext = dataContext;
            _adminSettings = adminSettings;
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
            return await MaskRequest.Approve(_dataContext, Guid.Parse(post));
        }

        [HttpPost("approvals/deny/{post}")]
        [Authorize]
        public async Task<ActionResult<bool>> Deny(string post)
        {
            return await MaskRequest.Deny(_dataContext, Guid.Parse(post));
        }
    }
}
