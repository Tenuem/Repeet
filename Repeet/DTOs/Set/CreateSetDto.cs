using System.ComponentModel.DataAnnotations;

namespace Repeet.Dto
{
    public record CreateSetDto(
        [Required][MaxLength(30, ErrorMessage = "The name can not be over 30 characters")] string Name
    );
}