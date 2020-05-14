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
using Microsoft.AspNetCore.Authorization;
using getthehotdish.Handlers.Exceptions;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskRequestController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public MaskRequestController(DataContext dataContext)
        {
            _dataContext = dataContext;
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
            return await MaskRequest.Create(_dataContext, maskRequestModel);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MaskRequestModel>> Put(Guid id, [FromBody] MaskRequestModel maskRequestModel, [FromQuery] Guid editKey)
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
