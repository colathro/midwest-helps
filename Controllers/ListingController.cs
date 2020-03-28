using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace getthehotdish.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ListingController : ControllerBase
    {


        private readonly ILogger<ListingController> _logger;
        private DataContext _dataContext;

        public ListingController(ILogger<ListingController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            _logger.LogInformation("Get Request. 🎁");

            _dataContext.Listings.Add(new Listing { Id = Guid.NewGuid(), PartitionKey = "Test"});

            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
