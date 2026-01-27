using Repeet.DTOs.Flashcard;
using Repeet.Models;

namespace Repeet.Interfaces
{
    public interface IFlashcardService
    {
        Task<IEnumerable<Flashcard>> GetAllAsync(Guid? setId = null);
        Task<Flashcard?> GetAsync(Guid fscId);
        Task<Flashcard> CreateAsync(Flashcard fsc);
        Task<Flashcard?> UpdateAsync(Guid fscId, UpdateFlashcardDto dto);
        Task<Flashcard?> DeleteAsync(Guid fscId);
    }
}