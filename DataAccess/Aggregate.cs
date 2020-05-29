using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace getthehotdish.DataAccess
{
    public class Aggregate
    {
        [Key]
        public Guid Id { get; set; }
        public string PartitionKey { get; set; }
        public DateTime CreatedOn { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }

        public async static Task AddToAggregate(DataContext dataContext, string name, int amount)
        {
            Aggregate agg = await dataContext.Aggregates.Where(a => a.Name == name).FirstOrDefaultAsync();

            if (agg == null)
            {
                agg = new Aggregate
                {
                    CreatedOn = DateTime.Now,
                    PartitionKey = "Agg",
                    Name = name,
                    Value = 0
                };

                dataContext.Add(agg);
            }

            agg.Value += amount;

            await dataContext.SaveChangesAsync();
        }
    }
}