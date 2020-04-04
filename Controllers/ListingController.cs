using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.DataAccess;
using getthehotdish.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ICollection<BusinessModel>> Get(int page, [FromQuery] int? businesstype = null, [FromQuery] string name = null)
        {
            _logger.LogInformation($"PAGE GET Request: {page}");

            try
            {
                if (businesstype != null && name != null)
                {
                    var businesses = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.BusinessType == (BusinessType)businesstype && l.BusinessNameSearch.Contains(name)).Select(l => new BusinessModel(l));
                    return await PaginatedList<BusinessModel>.CreateAsync(businesses, page, 10);
                }
                else if (businesstype != null)
                {
                    var businesses = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.BusinessType == (BusinessType)businesstype).Select(l => new BusinessModel(l));
                    return await PaginatedList<BusinessModel>.CreateAsync(businesses, page, 10);
                }
                else if (name != null)
                {
                    var businesses = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.BusinessNameSearch.Contains(name)).Select(l => new BusinessModel(l));
                    return await PaginatedList<BusinessModel>.CreateAsync(businesses, page, 10);
                }
                else
                {
                    var businesses = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey).Select(l => new BusinessModel(l));
                    return await PaginatedList<BusinessModel>.CreateAsync(businesses, page, 10);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        [Route("get/{id}")]
        public async Task<BusinessModel> Get(string id)
        {
            _logger.LogInformation($"ID GET Request: {id}");

            try
            {
                var listing = _dataContext.Listings.Where(l => l.Id == Guid.Parse(id) && l.PartitionKey == partitionKey).FirstOrDefault();

                if (listing != null)
                {
                    return new BusinessModel(listing);
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BusinessModel businessModel)
        {
            _logger.LogInformation($"LISTING POST Request: {businessModel.Name}");

            try
            {
                Listing listing = businessModel;
                listing.PartitionKey = partitionKey;

                _dataContext.Listings.Add(listing);
                await _dataContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] BusinessModel businessModel)
        {
            if (id != businessModel.Id)
            {
                return BadRequest();
            }

            var business = await _dataContext.Listings.FindAsync(id);
            if (business == null)
            {
                return NotFound();
            }

            try
            {
                business.Update(businessModel);
                await _dataContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) when (!BusinessExists(id))
            {
                return NotFound();
            }

            return Ok();
        }

        [HttpGet]
        [Route("search/{businessName}")]
        public async Task<ICollection<Listing>> Search(string businessName)
        {
            _logger.LogInformation($"PAGE Search Request: {businessName}");

            try
            {
                var listings = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.BusinessName == businessName).ToList();
                return listings;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(long id)
        {
            var todoItem = await _dataContext.Listings.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _dataContext.Listings.Remove(todoItem);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }

        private bool BusinessExists(Guid id) =>
         _dataContext.Listings.Any(e => e.Id == id);

    }
}
