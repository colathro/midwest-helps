using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using getthehotdish.DataAccess;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskRequestController : ControllerBase
    {
        private readonly DataContext _context;

        public MaskRequestController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaskRequestModel>>> GetMaskRequests()
        {
            return await _context.MaskRequests.Select(m => MaskRequestModel.ConvertToDTO(m)).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaskRequestModel>> GetMaskRequest(Guid id)
        {
            var maskRequest = await _context.MaskRequests.FindAsync(id);

            if (maskRequest == null)
            {
                return NotFound();
            }

            return MaskRequestModel.ConvertToDTO(maskRequest);
        }

        [HttpPost]
        public async Task<ActionResult<MaskRequest>> PostMaskRequest(MaskRequestModel maskRequest)
        {
            maskRequest.PartitionKey = "MR";
            maskRequest.CreatedOn = DateTime.UtcNow;

            MaskRequest dbo = maskRequest.ConvertToDBO();

            _context.MaskRequests.Add(dbo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMaskRequest", new { id = maskRequest.Id }, maskRequest);
        }

        private bool MaskRequestExists(Guid id)
        {
            return _context.MaskRequests.Any(e => e.Id == id);
        }
    }
}
