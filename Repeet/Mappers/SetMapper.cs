using Repeet.Dto;
using Repeet.Models;

namespace Repeet.Mappers
{
    public static class SetMapper
    {
        public static SetDto ToDto(this Set setModel) => new SetDto(setModel.Id, setModel.Name, setModel.Flashcards.Select(f => f.ToDto()).ToList());
    }
}