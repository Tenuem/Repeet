namespace Repeet.Helpers
{
    public class QueryObject
    {
        public string? SetName { get; set; } = null;
        public Guid? Author { get; set; } = null;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 25;
    }
}