using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.DataAccess;
using getthehotdish.Models;
using getthehotdish.Handlers.Exceptions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using getthehotdish.Utils;
using getthehotdish.Utils.Enums;

namespace getthehotdish.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<ContactController> _logger;
        private DataContext _dataContext;
        private EmailSettings _emailSettings;

        private const string partitionKey = "CN";

        public ContactController(ILogger<ContactController> logger, DataContext dataContext, EmailSettings emailSettings)
        {
            _logger = logger;
            _dataContext = dataContext;
            _emailSettings = emailSettings;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Contact contact)
        {
            try
            {
                if (!ContactValid(contact))
                {
                    throw new ErrorModelException(ErrorCode.InvalidField);
                }

                contact.PartitionKey = partitionKey;
                contact.CreatedOn = DateTime.UtcNow;

                _dataContext.Contacts.Add(contact);
                await _dataContext.SaveChangesAsync();

                await EmailUtils.SendEmailAsync(_emailSettings, EmailMessageType.Contact, "Thanks for contacting us!", "Thanks for contacting us!", contact.Email, contact.Name);

                return Ok();
            }
            catch (Exception ex)
            {
                this._logger.LogError(ex, "Error sending contact email");
                return BadRequest();
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<List<Contact>> GetContacts([FromQuery] string key)
        {
            return await _dataContext.Contacts.Where(c => c.Dismissed == false).ToListAsync();
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> DismissContact([FromQuery] Guid id, [FromQuery] string key)
        {
            var contact = _dataContext.Contacts.Where(r => r.Id == id).First();

            contact.Dismissed = true;

            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        private bool ContactValid(Contact contact)
        {
            if (contact.Message.Length > 25000)
            {
                return false;
            }

            if (contact.Email.Length > 100)
            {
                return false;
            }

            if (contact.Name.Length > 100)
            {
                return false;
            }

            return true;
        }
    }
}
