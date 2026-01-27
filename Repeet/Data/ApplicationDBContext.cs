using Microsoft.EntityFrameworkCore;
using Repeet.Models;

namespace Repeet.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions){}

        public DbSet<Flashcard> Flashcards { get; set; }
        public DbSet<Set> Sets { get; set; }
    }
}