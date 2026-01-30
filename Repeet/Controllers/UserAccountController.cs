using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Repeet.DTOs.Account;
using Repeet.Interfaces;
using Repeet.Models;

namespace Repeet.Controllers
{
    [Route("account/")]
    [ApiController]
    public class UserAccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService) : ControllerBase
    {
        private readonly UserManager<User> _userManager = userManager;
        private readonly SignInManager<User> _signInManager = signInManager;
        private readonly ITokenService _tokenService = tokenService;

        [HttpPost("register/")]
        public async Task<ActionResult<CreateUserDto>> Register ([FromBody] RegisterDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var user = new User
                {
                    UserName = dto.Username,
                    Email = dto.Email
                };

                var createdUser = await _userManager.CreateAsync(user, dto.Password);
                if (createdUser.Succeeded)
                {
                    var role = await _userManager.AddToRoleAsync(user, "User");
                    if (!role.Succeeded)
                        return StatusCode(500, role.Errors);
                    
                    if (user.UserName == null || user.Email == null)
                        return Unauthorized("Invalid username or password");

                    return Ok(new CreateUserDto(user.UserName, user.Email, _tokenService.CreateToken(user)));
                }
                return StatusCode(500, createdUser.Errors);
            } 
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpPost("login/")]
        public async Task<ActionResult<CreateUserDto>> Login(LoginDto dto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByNameAsync(dto.Username);
            if (user == null)
                return Unauthorized("Invalid username or password");
            
            var result = await _signInManager.CheckPasswordSignInAsync(user, dto.Password, false);
            if (!result.Succeeded)
                return Unauthorized("Invalid username or password");

            if (user.UserName == null || user.Email == null)
                return Unauthorized("Invalid username or password");

            return Ok(new CreateUserDto(user.UserName, user.Email, _tokenService.CreateToken(user))); 
        }

        // helper endpoint
        [Authorize]
        [HttpGet("whoami")]
        public IActionResult WhoAmI()
        {
            return Ok(new
            {
                User.Identity?.Name,
                Claims = User.Claims.Select(c => new { c.Type, c.Value })
            });
        }
    }
}