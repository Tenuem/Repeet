using Microsoft.EntityFrameworkCore;
using Repeet.Models;

namespace Repeet.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions){}

        public DbSet<Flashcard> Flashcard { get; set; }
        public DbSet<Set> Set { get; set; }
    }
}