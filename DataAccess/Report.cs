using getthehotdish.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.DataAccess
{
    public class Report
    {
        [Key]
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool Dismissed { get; set; }
        public Guid Business { get; set; }
        public ReportType ReportType { get; set; }
    }
}
