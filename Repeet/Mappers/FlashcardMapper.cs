using Repeet.DTOs.Flashcard;
using Repeet.Models;

namespace Repeet.Mappers
{
    public static class FlashcardMapper
    {
        public static FlashcardDto ToDto(this Flashcard fscModel) => new FlashcardDto(fscModel.Id, fscModel.Keyword, fscModel.Definition, fscModel.SetId);
    }
}