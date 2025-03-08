using Microsoft.EntityFrameworkCore;
using MVC_EFCore.Models;

namespace MVC_EFCore.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) { }

        public DbSet<Employee>  Employees { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=ANAMIKA\\SQLSERVER;database=DemoDb2;integrated security=true;TrustServerCertificate=true");
        }
    }
}
