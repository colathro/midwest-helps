﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.DataAccess;
using getthehotdish.Models;
using getthehotdish.Models.Exceptions;
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
        private AdminSettings _adminSettings;

        public ListingController(ILogger<ListingController> logger, DataContext dataContext, AdminSettings adminSettings)
        {
            _logger = logger;
            _dataContext = dataContext;
            _adminSettings = adminSettings;
        }

        [HttpGet]
        [Route("page/{page}")]
        public async Task<ICollection<BusinessModel>> Get(int page, [FromQuery] int? businesstype = null, [FromQuery] string name = null)
        {
            _logger.LogInformation($"PAGE GET Request: {page}");

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

        [HttpGet]
        [Route("get/{id}")]
        public async Task<BusinessModel> Get(string id)
        {
            _logger.LogInformation($"ID GET Request: {id}");
            var listing = _dataContext.Listings.Where(l => l.Id == Guid.Parse(id) && l.PartitionKey == partitionKey).FirstOrDefault();

            if (listing != null)
            {
                return new BusinessModel(listing);
            }
            else
            {
                return new BusinessModel();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] BusinessModel businessModel)
        {
            _logger.LogInformation($"LISTING POST Request: {businessModel.Name}");

            var listing = businessModel.ToListing();
            listing.PartitionKey = partitionKey;
            listing.CreatedOn = DateTime.UtcNow;

            _dataContext.Listings.Add(listing);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] BusinessModel businessModel)
        {
            _logger.LogInformation($"LISTING PUT Request: {businessModel.Name}");

            var listing = businessModel.ToListing();
            listing.PartitionKey = partitionKey;
            listing.Approved = false;
            listing.OriginalId = id;
            listing.Id = Guid.NewGuid();
            listing.CreatedOn = DateTime.UtcNow;

            _dataContext.Listings.Add(listing);
            await _dataContext.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("approvals/get/{key}")]
        public async Task<ICollection<BusinessModel>> GetApprovals(string key)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }
            return _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.Approved == false).Select(l => new BusinessModel(l)).ToList();
        }

        [HttpGet("approvals/get/approval/{key}")]
        public async Task<BusinessModel> GetApproval(string key, [FromQuery] Guid id)
        {
            if (!CheckAdmin(key))
            {
                throw new Exception("bad key");
            }
            var record = await _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.Approved == false && l.Id == id).FirstAsync();

            return new BusinessModel(record);
        }

        [HttpPost("approvals/approve/{key}/{post}")]
        public async Task<IActionResult> Approve(string key, string post)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }
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

        [HttpPost("approvals/deny/{key}/{post}")]
        public async Task<IActionResult> Deny(string key, string post)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }
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

        private bool CheckAdmin(string key)
        {
            return key == _adminSettings.Key;
        }

        [HttpGet]
        [Route("search/{businessName}")]
        public async Task<ICollection<Listing>> Search(string businessName)
        {
            _logger.LogInformation($"PAGE Search Request: {businessName}");

            return _dataContext.Listings.Where(l => l.PartitionKey == partitionKey && l.BusinessName == businessName).ToList();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id, string key)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }

            var todoItem = await _dataContext.Listings.FindAsync(id);

            if (todoItem == null)
            {
                // TODO: throw not found exception
                return NotFound();
            }

            _dataContext.Listings.Remove(todoItem);
            await _dataContext.SaveChangesAsync();

            return Ok();
        }
    }
}
