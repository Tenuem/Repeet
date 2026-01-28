using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Repeet.Models;

namespace Repeet.Data
{
    public class ApplicationDBContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions){}

        public DbSet<Flashcard> Flashcards { get; set; }
        public DbSet<Set> Sets { get; set; }

        // Create roles for users on creation
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            var roles = new List<IdentityRole<Guid>>
            {
                new() {
                    Id = new Guid("41de0eea-9776-4c0d-8412-462e7574b1b0"),
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                    ConcurrencyStamp = "ROLE_ADMIN"
                },
                new() {
                    Id = new Guid("2920eefd-1edd-49e4-aac5-89e5d31d8822"),
                    Name = "User",
                    NormalizedName = "USER",
                    ConcurrencyStamp = "ROLE_USER"
                }
            };
            builder.Entity<IdentityRole<Guid>>().HasData(roles);
        }
    }
}