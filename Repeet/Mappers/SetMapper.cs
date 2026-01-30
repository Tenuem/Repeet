using Repeet.Dto;
using Repeet.Models;

namespace Repeet.Mappers
{
    public static class SetMapper
    {
        public static SetDto ToDto(this Set setModel) => 
            new (setModel.Id, setModel.Name, setModel.Owner.UserName!, setModel.Flashcards.Select(f => f.ToDto()).ToList());
    }
}