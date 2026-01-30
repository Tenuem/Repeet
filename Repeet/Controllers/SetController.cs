using Microsoft.AspNetCore.Mvc;
using Repeet.Dto;
using Repeet.Models;
using Repeet.Interfaces;
using Repeet.Mappers;
using Repeet.Helpers;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Net;

namespace Repeet.Controllers
{
    [Route("sets/")]
    [ApiController]
    public class SetController(ISetRepository repository, UserManager<User> userManager) : ControllerBase
    {
        private readonly ISetRepository _repository = repository;
        private readonly UserManager<User> _userManager = userManager;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SetDto>>> GetAll([FromQuery] QueryObject qo)
        {
            var sets = await _repository.GetAllSetsAsync(qo);
            var setDtos = sets.Select(s => s.ToDto());

            return Ok(setDtos);
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<SetDto>> Get(Guid id)
        {
            var setModel = await _repository.GetSetByIdAsync(id);

            return (setModel is null) ?
                    NotFound("Set does not exist") : Ok(setModel.ToDto());
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<SetDto>> Create([FromBody] CreateSetDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var username = User.Identity!.Name;
            if (username is null)
                return BadRequest("You have to be logged in to create new sets");

            var user = await _userManager.FindByNameAsync(username);
            if (user is null)
                return BadRequest("No such user exists");
                            
            // Create a new model from DTO
            var setModel = await _repository.CreateSetAsync(new Set {
                Id = Guid.NewGuid(),
                Name = dto.Name,
                OwnerId = user.Id
            });

            // 201 response code
            return CreatedAtAction(nameof(Get), new {id = setModel.Id}, setModel.ToDto());
        }

        [Authorize]
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<SetDto>> Update([FromRoute] Guid setId, [FromBody] UpdateSetDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Check if this set belongs to the user
            var username = User.Identity!.Name;
            if (username is null)
                return BadRequest("You have to be logged in to update sets");

            var user = await _userManager.FindByNameAsync(username);
            var setOwner = await _repository.IsSetOwner(setId, user!.Id);

            if (!setOwner)
                return BadRequest("You can update only your sets");

            var setModel = await _repository.UpdateSetAsync(setId, dto);

            return (setModel is null) ?
                NotFound("Set does not exist") : Ok(setModel.ToDto());
        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid setId)
        {
            // Check if this set belongs to the user
            var username = User.Identity!.Name;
            if (username is null)
                return BadRequest("You have to be logged in to update sets");

            var user = await _userManager.FindByNameAsync(username);
            var setOwner = await _repository.IsSetOwner(setId, user!.Id);

            if (!setOwner)
                return BadRequest("You can update only your sets");

            var setModel = await _repository.DeleteSetByIdAsync(setId);

            return (setModel is null) ?
                NotFound("Set does not exist") : NoContent();
        }
    }
}