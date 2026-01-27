namespace Repeet.Models
{
    public class Set
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public required string Name { get; set; } = string.Empty;

    }
}