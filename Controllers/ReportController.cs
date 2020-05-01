using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.DataAccess;
using getthehotdish.Models;
using getthehotdish.Models.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace getthehotdish.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly ILogger<ReportController> _logger;
        private DataContext _dataContext;
        private AdminSettings _adminSettings;

        private const string partitionKey = "RP";

        public ReportController(ILogger<ReportController> logger, DataContext dataContext, AdminSettings adminSettings)
        {
            _logger = logger;
            _dataContext = dataContext;
            _adminSettings = adminSettings;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Report report)
        {
            try
            {
                if (!ReportValid(report))
                {
                    throw new ErrorModelException(ErrorCode.InvalidField);
                }

                report.PartitionKey = partitionKey;
                report.CreatedOn = DateTime.UtcNow;

                _dataContext.Reports.Add(report);
                await _dataContext.SaveChangesAsync();

                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<List<Report>> GetReports([FromQuery] string key)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }

            return await _dataContext.Reports.Where(r => r.Dismissed == false).ToListAsync();
        }

        [HttpPut]
        public async Task<IActionResult> DismissReport([FromQuery] Guid id, [FromQuery] string key)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }

            var report =  _dataContext.Reports.Where(r => r.Id == id).First();

            report.Dismissed = true;

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        private bool ReportValid(Report report)
        {
            if (report.ReportType < 0)
            {
                return false;
            }

            return true;
        }

        private bool CheckAdmin(string key)
        {
            return key == _adminSettings.Key;
        }
    }
}
