using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Identity.Client;

namespace Repeet.Models
{

    //[Table("Sets")]
    public class Set
    {
        public Guid Id { get; set; }
        public required string Name { get; set; } = string.Empty;    
        public IEnumerable<Flashcard> Flashcards { get; set; } = new List<Flashcard>();
        public Guid OwnerId { get; set; }
        public User Owner {get; set;} = null!;
    }
}