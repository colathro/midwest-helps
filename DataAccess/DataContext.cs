using Microsoft.EntityFrameworkCore;

namespace getthehotdish.DataAccess
{
    public class DataContext : DbContext
    {
        public DbSet<Listing> Listings { get; set; }

        public DbSet<MaskRequest> MaskRequests { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Contact> Contacts { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Listing>().ToContainer("Listings");
            modelBuilder.Entity<Listing>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<Listing>().HasPartitionKey(o => o.PartitionKey);

            modelBuilder.Entity<MaskRequest>().ToContainer("MaskRequests");
            modelBuilder.Entity<MaskRequest>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<MaskRequest>().HasPartitionKey(o => o.PartitionKey);

            modelBuilder.Entity<Report>().ToContainer("Reports");
            modelBuilder.Entity<Report>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<Report>().HasPartitionKey(o => o.PartitionKey);

            modelBuilder.Entity<Contact>().ToContainer("Contacts");
            modelBuilder.Entity<Contact>().HasAlternateKey(l => l.Id);
            modelBuilder.Entity<Contact>().HasPartitionKey(o => o.PartitionKey);
        }
    }
}
