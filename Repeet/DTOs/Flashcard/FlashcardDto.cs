namespace Repeet.DTOs.Flashcard
{
    public record FlashcardDto(
        Guid Id,
        string Keyword,
        string Definition,
        Guid? setId
    );
}