﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using getthehotdish.DataAccess;
using Microsoft.Extensions.Logging;
using System.ComponentModel.DataAnnotations;
using getthehotdish.Handlers.Exceptions;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskDonationController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public MaskDonationController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaskDonationModel>>> List()
        {
            return await MaskDonation.GetAllModel(_dataContext);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaskDonationModel>> Get(Guid id)
        {
            return await MaskDonation.GetModel(_dataContext, id);
        }

        [HttpPost]
        public async Task<ActionResult<MaskRequestModel>> Post(MaskRequestModel maskRequestModel)
        {
            return await MaskRequest.Create(_dataContext, maskRequestModel);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MaskRequestModel>> Put(Guid id, [FromBody] MaskRequestModel maskRequestModel, [FromQuery] Guid editKey)
        {
            return await MaskRequest.Update(_dataContext, id, maskRequestModel);
        }
    }
}
