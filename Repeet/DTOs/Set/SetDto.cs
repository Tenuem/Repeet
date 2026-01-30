using System.ComponentModel.DataAnnotations;
using Repeet.DTOs.Flashcard;
using Repeet.Models;

namespace Repeet.Dto
{
    public record SetDto(
        Guid Id,
        string Name,
        string AuthorUsername,
        IEnumerable<FlashcardDto> Flashcards
    );
}