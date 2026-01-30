using Repeet.DTOs.Flashcard;
using Repeet.Helpers;
using Repeet.Models;

namespace Repeet.Interfaces
{
    public partial interface IFlashcardRepository
    {
        Task<IEnumerable<Flashcard>> GetAllFlashcardsAsync(QueryObject query);
        Task<Flashcard?> GetFlashcardByIdAsync(Guid id);
        Task<Flashcard> CreateFlashcardAsync(Flashcard fscModel);
        Task<Flashcard?> UpdateFlashcardAsync(Guid id, UpdateFlashcardDto fscDto);
        Task<Flashcard?> DeleteFlashcardByIdAsync(Guid id);
    }

    public partial interface IFlashcardRepository
    {
        Task<bool> IsFlashcardOwner(Guid flashcardId, Guid userId);
    }
}