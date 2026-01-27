using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using Repeet.Data;
using Repeet.Dto;
using Repeet.Interfaces;
using Repeet.Models;

namespace Repeet.Repositories
{
    public class SetRepository(ApplicationDBContext db) : ISetRepository
    {
        private readonly ApplicationDBContext _db = db;

        public async Task<List<Set>> GetAllSetsAsync() => await _db.Sets.ToListAsync();
        public async Task<Set?> GetSetByIdAsync(Guid id) => await _db.Sets.FindAsync(id);        
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
    }
}