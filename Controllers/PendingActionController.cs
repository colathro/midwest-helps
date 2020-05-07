using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.DataAccess;
using getthehotdish.Handlers.Exceptions;
using getthehotdish.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace getthehotdish.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PendingActionController : ControllerBase
    {

        private readonly DataContext _dataContext;
        private AdminSettings _adminSettings;

        public PendingActionController(DataContext dataContext, AdminSettings adminSettings)
        {
            _dataContext = dataContext;
            _adminSettings = adminSettings;
        }

        [HttpGet("{key}")]
        public async Task<PendingActionResult> Get(string key)
        {
            if (!CheckAdmin(key))
            {
                throw new ErrorModelException(ErrorCode.BadKey);
            }

            var output = new PendingActionResult();

            output.MaskRequestApprovals = await MaskRequest.PendingApprovalCount(_dataContext);
            output.Contacts = await Contact.PendingApprovalCount(_dataContext);
            output.Reports = await Report.PendingApprovalCount(_dataContext);

            return output;
        }

        private bool CheckAdmin(string key)
        {
            return key == _adminSettings.Key;
        }
    }

    public class PendingActionResult
    {
        public int MaskRequestApprovals { get; set; }
        public int Reports { get; set; }
        public int Contacts { get; set; }
    }
}