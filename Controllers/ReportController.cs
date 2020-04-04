using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using getthehotdish.DataAccess;

namespace getthehotdish.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly ILogger<ListingController> _logger;
        private NotificationController _notification;

        public ReportController(ILogger<ListingController> logger, IOptions<NotificationSettings> notificationSettingsAccessor)
        {
            _logger = logger;
            _notification = new NotificationController(logger, notificationSettingsAccessor);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SendReportRequest request)
        {
            _logger.LogInformation($"Send report request about {request.Business.Name} ({request.Business.Id}): {request.ReportType}");

            try
            {
                await _notification.SendReportReceivedEmailAsync(request.Business, request.ReportType);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
