using System.ComponentModel.DataAnnotations;
using Repeet.DTOs.Flashcard;

namespace Repeet.Dto
{
    public record SetDto(
        Guid Id,
        string Name,
        IEnumerable<FlashcardDto> Flashcards
    );
}