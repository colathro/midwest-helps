using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.ApplicationInsights;
using System;
using System.Configuration;

namespace getthehotdish.DataAccess
{
    public class DataContext : DbContext
    {
        public DbSet<Listing> Listings { get; set; }

        public DataContext(DbContextOptions<DataContext> options)
        : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultContainer("Listings");

            modelBuilder.Entity<Listing>()
                .ToContainer("Listings");

            modelBuilder.Entity<Listing>()
                .HasNoDiscriminator();

            modelBuilder.Entity<Listing>()
                .HasPartitionKey(o => o.PartitionKey);
        }
    }
}
