using System.ComponentModel.DataAnnotations;

namespace Repeet.Dto
{
    public record SetDto(
        Guid Id,
        string Name
    );
}