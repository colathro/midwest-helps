using getthehotdish.Models;
using System;
using System.Linq;

namespace getthehotdish.DataAccess
{
    public class MaskRequest
    {
        [System.ComponentModel.DataAnnotations.Key]
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public Guid EditKey { get; set; }
        public Guid OriginalId { get; set; }
        public bool Approved { get; set; }
    }
}
