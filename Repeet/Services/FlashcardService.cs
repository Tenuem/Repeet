using Repeet.DTOs.Flashcard;
using Repeet.Interfaces;
using Repeet.Models;

namespace Repeet.Services
{
    public class FlashcardService(IFlashcardRepository repository) : IFlashcardService
    {
        private readonly IFlashcardRepository _repository = repository;

        public async Task<IEnumerable<Flashcard>> GetAllAsync(Guid? setId = null)
        {
            var flashcards = await _repository.GetAllFlashcardsAsync();
            if (setId is not null)
                flashcards = flashcards.Where(fsc => fsc.SetId == setId);

            return flashcards;
        }

        public async Task<Flashcard?> GetAsync(Guid id) => await _repository.GetFlashcardByIdAsync(id);        
        public async Task<Flashcard> CreateAsync(Flashcard fsc) => await _repository.CreateFlashcardAsync(fsc);
        public async Task<Flashcard?> UpdateAsync(Guid id, UpdateFlashcardDto dto) => await _repository.UpdateFlashcardAsync(id, dto);
        public async Task<Flashcard?> DeleteAsync(Guid fscId) => await _repository.DeleteFlashcardByIdAsync(fscId);
    }
}