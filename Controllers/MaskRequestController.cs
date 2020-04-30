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

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskRequestController : ControllerBase
    {
        private readonly DataContext _dataContext;
        private AdminSettings _adminSettings;
        private readonly ILogger<MaskRequestController> _logger;

        private readonly string partitionKey = "MR";

        public MaskRequestController(ILogger<MaskRequestController> logger, DataContext dataContext, AdminSettings adminSettings)
        {
            _logger = logger;
            _dataContext = dataContext;
            _adminSettings = adminSettings;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaskRequestModel>>> GetMaskRequests()
        {
            return await _dataContext.MaskRequests.Where(m => m.Approved == true).Select(m => m.ToMaskRequestModel()).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaskRequestModel>> GetMaskRequest(Guid id)
        {
            var maskRequest = await _dataContext.MaskRequests.FindAsync(id);

            if (maskRequest == null)
            {
                return NotFound();
            }

            return maskRequest.ToMaskRequestModel();
        }

        [HttpPost]
        public async Task<ActionResult<MaskRequest>> PostMaskRequest(MaskRequestModel maskRequest)
        {
            maskRequest.PartitionKey = this.partitionKey;
            maskRequest.CreatedOn = DateTime.UtcNow;

            var dbo = maskRequest.ToMaskRequest();
            dbo.EditKey = Guid.NewGuid();

            try
            {
                _dataContext.MaskRequests.Add(dbo);
                await _dataContext.SaveChangesAsync();
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Data);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] MaskRequestModel maskRequestModel, [FromQuery] Guid editKey)
        {
            _logger.LogInformation($"MASKREQUEST PUT Request: {id}");

            try
            {
                var maskRequest = maskRequestModel.ToMaskRequest();
                maskRequest.PartitionKey = partitionKey;
                maskRequest.Approved = false;
                maskRequest.OriginalId = id;
                maskRequest.Id = Guid.NewGuid();
                maskRequest.CreatedOn = DateTime.UtcNow;

                _dataContext.MaskRequests.Add(maskRequest);
                await _dataContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("approvals/get/{key}")]
        public async Task<ICollection<MaskRequestModel>> GetApprovals(string key)
        {
            if (!CheckAdmin(key))
            {
                throw new Exception("bad key");
            }
            return _dataContext.MaskRequests.Where(l => l.PartitionKey == partitionKey && l.Approved == false).Select(m => m.ToMaskRequestModel()).ToList();
        }

        [HttpPost("approvals/approve/{key}/{post}")]
        public async Task<IActionResult> Approve(string key, string post)
        {
            if (!CheckAdmin(key))
            {
                return BadRequest();
            }
            try
            {
                var newMaskRequest = _dataContext.MaskRequests.Where(l => l.Id == Guid.Parse(post)
                    && l.PartitionKey == partitionKey
                    && l.Approved == false).FirstOrDefault();

                var oldMaskRequest = _dataContext.MaskRequests.Where(l => l.Id == newMaskRequest.OriginalId
                     && l.PartitionKey == partitionKey
                     && l.Approved == true).FirstOrDefault();

                if (newMaskRequest == null)
                {
                    return NotFound();
                }

                if (oldMaskRequest != null)
                {
                    var oldRefMaskRequests = _dataContext.MaskRequests.Where(l => l.PartitionKey == partitionKey
                        && l.OriginalId == oldMaskRequest.Id && l.Id != newMaskRequest.Id);

                    await oldRefMaskRequests.ForEachAsync((maskRequest) =>
                    {
                        maskRequest.OriginalId = newMaskRequest.Id;
                    });

                    _dataContext.Remove(oldMaskRequest);
                }

                newMaskRequest.Approved = true;

                await _dataContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("approvals/deny/{key}/{post}")]
        public async Task<IActionResult> Deny(string key, string post)
        {
            if (!CheckAdmin(key))
            {
                return BadRequest();
            }
            try
            {
                var maskRequest = _dataContext.MaskRequests.Where(l => l.Id == Guid.Parse(post)
                    && l.PartitionKey == partitionKey
                    && l.Approved == false).FirstOrDefault();

                if (maskRequest != null)
                {
                    _dataContext.Remove(maskRequest);
                    await _dataContext.SaveChangesAsync();
                }

                return Ok();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool CheckAdmin(string key)
        {
            return key == _adminSettings.Key;
        }

        private bool MaskRequestExists(Guid id)
        {
            return _dataContext.MaskRequests.Any(e => e.Id == id);
        }
    }
}
