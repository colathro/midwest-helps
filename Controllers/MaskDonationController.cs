using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Mvc;
using getthehotdish.DataAccess;
using getthehotdish.BusinessLogic;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskDonationController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly EmailSettings emailSettings;

        public MaskDonationController(DataContext dataContext, EmailSettings emailSettings)
        {
            this.dataContext = dataContext;
            this.emailSettings = emailSettings;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaskDonationModel>>> List()
        {
            return await MaskDonation.GetAllModel(dataContext);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaskDonationModel>> Get(Guid id)
        {
            return await MaskDonation.GetModel(dataContext, id);
        }

        [HttpPost]
        public async Task<ActionResult<MaskDonationModel>> Post(MaskDonationModel maskDonationModel)
        {
            return await Donation.CreateMaskDonation(dataContext, emailSettings, maskDonationModel);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MaskDonationModel>> Put(Guid id, [FromBody] MaskDonationModel maskDonationModel)
        {
            return await MaskDonation.Update(dataContext, id, maskDonationModel);
        }

        [HttpPost("updateStatus/{status}/{id}")]
        public async Task<ActionResult<MaskDonationModel>> UpdateStatus(string status, Guid id)
        {
            return await Donation.UpdateMaskDonationStatus(dataContext, status, id);
        }
    }
}
