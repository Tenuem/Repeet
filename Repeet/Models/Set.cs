using System.ComponentModel.DataAnnotations.Schema;

namespace Repeet.Models
{

    [Table("Sets")]
    public class Set
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; } = string.Empty;
        
        public IEnumerable<Flashcard> Flashcards { get; set; } = new List<Flashcard>();
    }
}