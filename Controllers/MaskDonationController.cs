using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using getthehotdish.Models;
using Microsoft.AspNetCore.Mvc;
using DB = getthehotdish.DataAccess;
using getthehotdish.BusinessLogic;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaskDonationController : ControllerBase
    {
        private readonly DB.DataContext dataContext;
        private readonly EmailSettings emailSettings;

        public MaskDonationController(DB.DataContext dataContext, EmailSettings emailSettings)
        {
            this.dataContext = dataContext;
            this.emailSettings = emailSettings;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MaskDonationModel>>> List()
        {
            return await DB.MaskDonation.GetAllModel(dataContext);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MaskDonationModel>> Get(Guid id)
        {
            return await DB.MaskDonation.GetModel(dataContext, id);
        }

        [HttpPost]
        public async Task<ActionResult<MaskDonationModel>> Post(MaskDonationModel maskDonationModel)
        {
            return await MaskDonation.Create(dataContext, emailSettings, maskDonationModel);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MaskDonationModel>> Put(Guid id, [FromBody] MaskDonationModel maskDonationModel)
        {
            return await DB.MaskDonation.Update(dataContext, id, maskDonationModel);
        }

        [HttpPost("updateStatus/{status}/{id}")]
        public async Task<ActionResult<MaskDonationModel>> UpdateStatus(string status, Guid id)
        {
            return await MaskDonation.UpdateStatus(dataContext, emailSettings, status, id);
        }
    }
}
