using Microsoft.AspNetCore.Identity;
using Repeet.DTOs.Flashcard;
using Repeet.Helpers;
using Repeet.Interfaces;
using Repeet.Models;

namespace Repeet.Services
{
    public class FlashcardService(IFlashcardRepository fscRepository, ISetRepository setRepository, UserManager<User> userManager) : IFlashcardService
    {
        private readonly IFlashcardRepository _fscRepository = fscRepository;
        private readonly ISetRepository _setRepository = setRepository;
        private readonly UserManager<User> _userManager = userManager;

        public async Task<IEnumerable<Flashcard>> GetAllAsync(QueryObject query, Guid? setId = null)
        {
            var flashcards = await _fscRepository.GetAllFlashcardsAsync(query);
            if (setId is not null)
                flashcards = flashcards.Where(fsc => fsc.SetId == setId);

            return flashcards;
        }

        public async Task<Flashcard?> GetAsync(Guid id) => await _fscRepository.GetFlashcardByIdAsync(id);        
        public async Task<Flashcard> CreateAsync(Flashcard fsc) => await _fscRepository.CreateFlashcardAsync(fsc);
        public async Task<Flashcard?> UpdateAsync(Guid id, UpdateFlashcardDto dto) => await _fscRepository.UpdateFlashcardAsync(id, dto);
        public async Task<Flashcard?> DeleteAsync(Guid fscId) => await _fscRepository.DeleteFlashcardByIdAsync(fscId);

        public async Task<bool> SetExists(Guid id) => await _setRepository.SetExists(id);
        public async Task<bool> IsSetOwner(Guid setId, Guid ownerId) => await _setRepository.IsSetOwner(setId, ownerId);
        public async Task<bool> IsFlashcardOwner(Guid id, string username) {
            var user = await _userManager.FindByNameAsync(username);
            if (user is null)
                return false;
                
            return await _fscRepository.IsFlashcardOwner(id, user.Id);
        } 
    }
}