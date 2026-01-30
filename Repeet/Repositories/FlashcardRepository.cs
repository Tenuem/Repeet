using Repeet.Data;
using Repeet.DTOs.Flashcard;
using Repeet.Interfaces;
using Repeet.Models;
using Microsoft.EntityFrameworkCore;
using Repeet.Helpers;

namespace Repeet.Repositories
{
    public class FlashcardRepository(ApplicationDBContext db) : IFlashcardRepository
    {
        private readonly ApplicationDBContext _db = db;

        public async Task<IEnumerable<Flashcard>> GetAllFlashcardsAsync(QueryObject query)
        {
            var flashcards = _db.Flashcards.AsQueryable();

            if (query.Author != null)
                flashcards = flashcards
                            .Include(f => f.Set)
                            .Where(f => f.Set!.OwnerId == query.Author);

            flashcards = flashcards.OrderBy(f => f.Keyword);

            var skip = (query.PageNumber - 1) * query.PageSize;

            return await flashcards.Skip(skip).Take(query.PageSize).ToListAsync();
        } 
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

        public async Task<bool> IsFlashcardOwner(Guid flashcardId, Guid userId)
        {
            var flashcard = await _db.Flashcards.FirstOrDefaultAsync(f => f.Id == flashcardId);

            return flashcard!.OwnerId == userId;
        }
    }
}