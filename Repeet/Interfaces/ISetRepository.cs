using Repeet.Dto;
using Repeet.Models;

namespace Repeet.Interfaces
{
    public interface ISetRepository
    {
        Task<List<Set>> GetAllSetsAsync();
        Task<Set?> GetSetByIdAsync(Guid id);
        Task<Set> CreateSetAsync(Set setModel);
        Task<Set?> UpdateSetAsync(Guid id, UpdateSetDto setDto);
        Task<Set?> DeleteSetByIdAsync(Guid id);
        
    }
}