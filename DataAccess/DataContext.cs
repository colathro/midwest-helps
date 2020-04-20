using Microsoft.EntityFrameworkCore;

namespace getthehotdish.DataAccess
{
    public class DataContext : DbContext
    {
        public DbSet<Listing> Listings { get; set; }

        public DbSet<MaskRequest> MaskRequests { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultContainer("Content");

            modelBuilder.Entity<Listing>().ToContainer("Content");
            modelBuilder.Entity<Listing>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<Listing>().HasPartitionKey(o => o.PartitionKey);

            modelBuilder.Entity<MaskRequest>().ToContainer("Content");
            modelBuilder.Entity<MaskRequest>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<MaskRequest>().HasPartitionKey(o => o.PartitionKey);
        }
    }
}
