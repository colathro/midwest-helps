using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.DataAccess
{
    public class Contact
    {
        [Key]
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool Dismissed { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Message { get; set; }

        public async static Task<int> PendingApprovalCount(DataContext dataContext)
        {
            var all = await dataContext.Contacts.Where(c => c.Dismissed == false).ToListAsync();
            return all.Count;
        }
    }
}
