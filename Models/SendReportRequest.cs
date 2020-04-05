using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using getthehotdish.DataAccess;

namespace getthehotdish.Models
{
    public class SendReportRequest
    {
        public BusinessModel Business { get; set; }
        public ReportType ReportType { get; set; }
    }
}
