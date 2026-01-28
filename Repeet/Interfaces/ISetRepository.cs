using Repeet.Dto;
using Repeet.Models;

namespace Repeet.Interfaces
{
    public interface ISetRepository
    {
        // CRUD operations
        Task<IEnumerable<Set>> GetAllSetsAsync();
        Task<Set?> GetSetByIdAsync(Guid id);
        Task<Set> CreateSetAsync(Set setModel);
        Task<Set?> UpdateSetAsync(Guid id, UpdateSetDto setDto);
        Task<Set?> DeleteSetByIdAsync(Guid id);
        
        // Helper methods
        Task<bool> SetExists(Guid id);
    }
}