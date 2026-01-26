namespace Repeet.Models
{
    public class Flashcard
    {
        public int Id { get; set; }
        public string Keyword { get; set; } = string.Empty;
        public string Definition { get; set; } = string.Empty;
        public int? SetId { get; set; }
    }
}
