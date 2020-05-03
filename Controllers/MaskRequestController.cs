using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using getthehotdish.DataAccess;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using getthehotdish.Handlers.Exceptions;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskRequestController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private AdminSettings _adminSettings;

        public MaskRequestController(DataContext dataContext, AdminSettings adminSettings)
        {
            _dataContext = dataContext;
            _adminSettings = adminSettings;
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

        [HttpPost]
        public async Task<ActionResult<MaskRequestModel>> Post(MaskRequestModel maskRequestModel)
        {
            return await MaskRequest.Create(_dataContext, maskRequestModel);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MaskRequestModel>> Put(Guid id, [FromBody] MaskRequestModel maskRequestModel, [FromQuery] Guid editKey)
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
            return await MaskRequest.Approve(_dataContext, Guid.Parse(post));
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
