namespace Repeet.Models
{
    public class Flashcard
    {
        public Guid Id { get; set; }
        public string Keyword { get; set; } = string.Empty;
        public string Definition { get; set; } = string.Empty;
        public Guid? SetId { get; set; }
        public Set? Set { get; set; }
        public Guid? OwnerId { get; set; }
        public User? Owner { get; set; }
    }
}
