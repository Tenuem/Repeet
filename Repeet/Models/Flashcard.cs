namespace Repeet.Models
{
    public class Flashcard
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Keyword { get; set; } = string.Empty;
        public string Definition { get; set; } = string.Empty;
        public int? SetId { get; set; }
    }
}
