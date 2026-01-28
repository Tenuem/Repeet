using System.ComponentModel.DataAnnotations;

namespace Repeet.DTOs.Flashcard
{
    public record UpdateFlashcardDto(
        [Required]
        [MaxLength(30, ErrorMessage = "The keyword can not be over 30 characters")]
        string Keyword,

        [Required]
        [MaxLength(100, ErrorMessage = "The defintion can not be over 100 characters")]
        string Definition
    );
}