using System.ComponentModel.DataAnnotations;

namespace Repeet.Dto
{
    public record UpdateSetDto(
        [Required]
        [MaxLength(30, ErrorMessage = "The name can not be over 30 characters")]
        string Name
    );
}