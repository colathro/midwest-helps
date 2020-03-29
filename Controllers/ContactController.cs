using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace getthehotdish.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<ListingController> _logger;
        private NotificationController _notification;

        public ContactController(ILogger<ListingController> logger, IOptions<NotificationSettings> notificationSettingsAccessor)
        {
            _logger = logger;
            _notification = new NotificationController(logger, notificationSettingsAccessor);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] SendMessageRequest request)
        {
            _logger.LogInformation($"Send email request from {request.Name} ({request.Email}): {request.Message}");

            try
            {
                await _notification.SendMessageReceivedEmailAsync(request.Name, request.Email, request.Message);
                return Ok();
            } catch
            {
                return BadRequest();
            }
        }
    }
}
