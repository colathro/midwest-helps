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
        private const string partitionKey = "ND";

        private readonly ILogger<ListingController> _logger;
        private DataContext _dataContext;

        public ListingController(ILogger<ListingController> logger, DataContext dataContext)
        {
            _logger = logger;
            _dataContext = dataContext;
        }

        [HttpGet]
        [Route("page/{page}")]
        public async Task<ICollection<Listing>> Get(int page)
        {
            _logger.LogInformation($"PAGE GET Request: {page}");

            try
            {
                var listings = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey).ToList();
                return listings;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<Listing> Get(string id)
        {
            _logger.LogInformation($"ID GET Request: {id}");

            var listing = _dataContext.Listings.Where(l => l.Id == Guid.Parse(id) && l.PartitionKey == partitionKey).First();

            return listing;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Listing listing)
        {
            _logger.LogInformation($"LISTNG POST Request: {listing.BusinessName}");

            listing.PartitionKey = partitionKey;

            try
            {
                _dataContext.Listings.Add(listing);
                await _dataContext.SaveChangesAsync();
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
