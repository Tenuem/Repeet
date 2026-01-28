using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Repeet.DTOs.Account
{
    public record LoginDto(
        [Required] string Username, 
        [Required] string Password
    );
}