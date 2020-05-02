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
using Microsoft.Extensions.Options;

namespace getthehotdish.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ILogger<ContactController> _logger;
        private DataContext _dataContext;
        private AdminSettings _adminSettings;

        private const string partitionKey = "CN";

        public ContactController(ILogger<ContactController> logger, DataContext dataContext, AdminSettings adminSettings)
        {
            _logger = logger;
            _dataContext = dataContext;
            _adminSettings = adminSettings;
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

                return Ok();
            } 
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet]
        public async Task<List<Contact>> GetContacts([FromQuery] string key)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }

            return await _dataContext.Contacts.Where(c => c.Dismissed == false).ToListAsync();
        }

        [HttpPut]
        public async Task<IActionResult> DismissContact([FromQuery] Guid id, [FromQuery] string key)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }

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

        private bool CheckAdmin(string key)
        {
            return key == _adminSettings.Key;
        }
    }
}
