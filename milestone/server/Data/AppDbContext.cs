using Microsoft.EntityFrameworkCore;
using FullStackApp.Models;
using FullStackApp.Services;

namespace FullStackApp.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, RoleName = "Admin" },
                new Role { RoleId = 2, RoleName = "User" }
            );


            string adminHashedPassword = AuthService.HashPassword("Admin@123");
            string userHashedPassword = AuthService.HashPassword("User@123");

            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    FirstName = "Sanjay",
                    LastName = "Deep",
                    Email = "admin@gmail.com",
                    RoleId = 1,
                    PasswordHash = adminHashedPassword 
                },
                new User
                {
                    Id = 2,
                    FirstName = "Divine",
                    LastName = "S",
                    Email = "Divine@gmail.com",
                    RoleId = 2,
                    PasswordHash = userHashedPassword // ✅ Store hashed password
                }
            );
        }

    }
}