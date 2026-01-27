using Repeet.Data;
using Repeet.DTOs.Flashcard;
using Repeet.Interfaces;
using Repeet.Models;
using Microsoft.EntityFrameworkCore;

namespace Repeet.Repositories
{
    public class FlashcardRepository(ApplicationDBContext db) : IFlashcardRepository
    {
        private readonly ApplicationDBContext _db = db;

        public async Task<IEnumerable<Flashcard>> GetAllFlashcardsAsync() => await _db.Flashcards.ToListAsync();
        public async Task<Flashcard?> GetFlashcardByIdAsync(Guid id) => await _db.Flashcards.FindAsync(id);        
        public async Task<Flashcard> CreateFlashcardAsync(Flashcard fsModel)
        {
            await _db.Flashcards.AddAsync(fsModel);
            await _db.SaveChangesAsync();

            return fsModel;
        }

        public async Task<Flashcard?> UpdateFlashcardAsync(Guid id, UpdateFlashcardDto dto)
        {
            var fsModel = await _db.Flashcards.FirstOrDefaultAsync(fs => fs.Id == id);
            if (fsModel is null)
                return null;

            fsModel.Keyword = dto.Keyword;
            fsModel.Definition = dto.Definition;
            await _db.SaveChangesAsync();

            return fsModel;
        }

        public async Task<Flashcard?> DeleteFlashcardByIdAsync(Guid id)
        {
            var fsModel = await _db.Flashcards.FirstOrDefaultAsync(fs => fs.Id == id);
            if (fsModel is null)
                return null;

            _db.Flashcards.Remove(fsModel);
            await _db.SaveChangesAsync();

            return fsModel;
        }
    }
}