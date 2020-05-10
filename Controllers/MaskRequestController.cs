using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Mvc;
using getthehotdish.DataAccess;
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
            _ = EmailUtils.SendEmailAsync(_emailSettings, EmailMessageType.MaskRequestSubmitted, "Your mask request is in review", "Request in review", maskRequestModel.Recipient.Email, maskRequestModel.Recipient.Name);
            return toReturn;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MaskRequestModel>> Put(Guid id, [FromBody] MaskRequestModel maskRequestModel)
        {
            return await MaskRequest.Update(_dataContext, id, maskRequestModel);
        }

        [HttpGet("approvals/get/{key}")]
        public async Task<ICollection<MaskRequestModel>> GetApprovals(string key)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }
            return await MaskRequest.GetAllApprovedModel(_dataContext, false);
        }

        [HttpPost("approvals/approve/{key}/{post}")]
        public async Task<ActionResult<MaskRequestModel>> Approve(string key, string post)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }
            var maskRequestModel = await MaskRequest.Approve(_dataContext, Guid.Parse(post));
            _ = EmailUtils.SendEmailAsync(_emailSettings, EmailMessageType.MaskRequestApproved, "Your mask request is approved!", "Request approved", maskRequestModel.Recipient.Email, maskRequestModel.Recipient.Name);
            return maskRequestModel;
        }

        [HttpPost("approvals/deny/{key}/{post}")]
        public async Task<ActionResult<bool>> Deny(string key, string post)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }
            return await MaskRequest.Deny(_dataContext, Guid.Parse(post));
        }

        private bool CheckAdmin(string key)
        {
            return key == _adminSettings.Key;
        }
    }
}
