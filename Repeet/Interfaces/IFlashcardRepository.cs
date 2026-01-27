using Repeet.DTOs.Flashcard;
using Repeet.Models;

namespace Repeet.Interfaces
{
    public interface IFlashcardRepository
    {
        Task<IEnumerable<Flashcard>> GetAllFlashcardsAsync();
        Task<Flashcard?> GetFlashcardByIdAsync(Guid id);
        Task<Flashcard> CreateFlashcardAsync(Flashcard fscModel);
        Task<Flashcard?> UpdateFlashcardAsync(Guid id, UpdateFlashcardDto fscDto);
        Task<Flashcard?> DeleteFlashcardByIdAsync(Guid id);
    }
}