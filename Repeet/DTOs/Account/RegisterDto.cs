using System.ComponentModel.DataAnnotations;
using Microsoft.Identity.Client;

namespace Repeet.DTOs.Account
{
    public record RegisterDto (
        [Required] string Username,
        [Required][EmailAddress] string? Email,
        [Required] string Password
    );
}