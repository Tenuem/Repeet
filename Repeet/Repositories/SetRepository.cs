using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Repeet.Data;
using Repeet.Dto;
using Repeet.Helpers;
using Repeet.Interfaces;
using Repeet.Models;

namespace Repeet.Repositories
{
    public class SetRepository(ApplicationDBContext db) : ISetRepository
    {
        private readonly ApplicationDBContext _db = db;

        public async Task<IEnumerable<Set>> GetAllSetsAsync(QueryObject query) 
        {
            var sets = _db.Sets.AsQueryable();

            if (!string.IsNullOrWhiteSpace(query.SetName))
                sets = sets.Where(s => s.Name.Contains(query.SetName));

            if (query.Author != null)
                sets = sets.Where(s => s.OwnerId.Equals(query.Author));
            
            sets = sets.OrderBy(s => s.Name);
            sets = sets.Include(s => s.Owner);

            return await sets.ToListAsync();
        } 
        public async Task<Set?> GetSetByIdAsync(Guid id) => 
            await _db.Sets.Include(s => s.Owner).Include(f => f.Flashcards).FirstOrDefaultAsync(f => f.Id == id);        
        public async Task<Set> CreateSetAsync(Set setModel)
        {
            await _db.Sets.AddAsync(setModel);
            await _db.SaveChangesAsync();

            return setModel;
        }

        public async Task<Set?> UpdateSetAsync(Guid id, UpdateSetDto dto)
        {
            var setModel = await _db.Sets.FirstOrDefaultAsync(s => s.Id == id);
            if (setModel is null)
                return null;

            setModel.Name = dto.Name;
            await _db.SaveChangesAsync();

            return setModel;
        }

        public async Task<Set?> DeleteSetByIdAsync(Guid id)
        {
            var setModel = await _db.Sets.FirstOrDefaultAsync(s => s.Id == id);
            if (setModel is null)
                return null;

            _db.Sets.Remove(setModel);
            await _db.SaveChangesAsync();

            return setModel;
        }

        public async Task<bool> SetExists(Guid id) => await _db.Sets.AnyAsync(s => s.Id == id);

        public async Task<bool> IsSetOwner(Guid setId, Guid ownerId)
        {
            var set = await _db.Sets.FirstOrDefaultAsync(s => s.Id == setId);
            
            return set!.OwnerId == ownerId;
        }
    }
}