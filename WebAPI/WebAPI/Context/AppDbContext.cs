using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebAPI.Models;

namespace WebAPI.Context
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        { 
        }

        public DbSet<Student> Students { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().HasData(
                new Student
                {
                    Id = 1,
                    Name = "Isabel",
                    Email = "isabel@email.com",
                    PhoneNumber = "1234567890",
                    Age = 22
                },
                new Student
                {
                    Id = 2,
                    Name = "Samuel",
                    Email = "samuel@email.com",
                    PhoneNumber = "+55 21 99999-9999",
                    Age = 24
                }
            );
        }
    }
}
