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
                    var businesses = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.BusinessType == (BusinessType)businesstype && l.BusinessNameSearch.Contains(name) && l.Approved == true).Select(l => new BusinessModel(l));
                    return await PaginatedList<BusinessModel>.CreateAsync(businesses, page, 10);
                }
                else if (businesstype != null)
                {
                    var businesses = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.BusinessType == (BusinessType)businesstype && l.Approved == true).Select(l => new BusinessModel(l));
                    return await PaginatedList<BusinessModel>.CreateAsync(businesses, page, 10);
                }
                else if (name != null)
                {
                    var businesses = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.BusinessNameSearch.Contains(name) && l.Approved == true).Select(l => new BusinessModel(l));
                    return await PaginatedList<BusinessModel>.CreateAsync(businesses, page, 10);
                }
                else
                {
                    var businesses = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.Approved == true).Select(l => new BusinessModel(l));
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
                listing.CreatedOn = DateTime.UtcNow;

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
            _logger.LogInformation($"LISTING PUT Request: {businessModel.Name}");

            try
            {
                Listing listing = businessModel;
                listing.PartitionKey = partitionKey;
                listing.Approved = false;
                listing.OriginalId = id;
                listing.Id = Guid.NewGuid();
                listing.CreatedOn = DateTime.UtcNow;

                _dataContext.Listings.Add(listing);
                await _dataContext.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("approvals/get/{key}")]
        public async Task<ICollection<BusinessModel>> GetApprovals(string key)
        {
            return _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.Approved == false).Select(l => new BusinessModel(l)).ToList();
        }

        [HttpPost("approvals/approve/{key}/{post}")]
        public async Task<IActionResult> Approve(string key, string post)
        {
            try
            {
                // get ref to new listing
                var newListing = _dataContext.Listings.Where(l => l.Id == Guid.Parse(post) 
                    && l.PartitionKey == partitionKey 
                    && l.Approved == false).FirstOrDefault();
                
                // get ref to old listing
                var oldListing = _dataContext.Listings.Where(l => l.Id == newListing.OriginalId
                     && l.PartitionKey == partitionKey
                     && l.Approved == true).FirstOrDefault();

                if (newListing == null)
                {
                    return NotFound();
                }

                if (oldListing != null)
                {
                    // get the old references that point to the old listing (new listing is now original)
                    var oldRefListings = _dataContext.Listings.Where(l => l.PartitionKey == partitionKey
                        && l.OriginalId == oldListing.Id && l.Id != newListing.Id);

                    // update them
                    await oldRefListings.ForEachAsync((listing) =>
                    {
                        listing.OriginalId = newListing.Id;
                    });

                    _dataContext.Remove(oldListing);
                }

                newListing.Approved = true;

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
            try
            {
                var listing = _dataContext.Listings.Where(l => l.Id == Guid.Parse(post) 
                    && l.PartitionKey == partitionKey 
                    && l.Approved == false).FirstOrDefault();

                if (listing != null)
                {
                    _dataContext.Remove(listing);
                    await _dataContext.SaveChangesAsync();
                }

                return Ok();

            }
            catch (Exception ex)
            {
                throw ex;
            }
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

        private bool BusinessExists(Guid id) =>
         _dataContext.Listings.Any(e => e.Id == id);

    }
}
