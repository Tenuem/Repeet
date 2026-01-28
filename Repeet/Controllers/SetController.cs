using Microsoft.AspNetCore.Mvc;
using Repeet.Dto;
using Repeet.Models;
using Repeet.Interfaces;
using Repeet.Mappers;
using Repeet.Helpers;

namespace Repeet.Controllers
{
    [Route("sets/")]
    [ApiController]
    public class SetController(ISetRepository repository) : ControllerBase
    {
        private readonly ISetRepository _repository = repository;

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

        [HttpPost]
        public async Task<ActionResult<SetDto>> Create([FromBody] CreateSetDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                            
            // Create a new model from DTO
            var setModel = await _repository.CreateSetAsync(new Set {
                Id = Guid.NewGuid(),
                Name = dto.Name
            });

            // 201 response code
            return CreatedAtAction(nameof(Get), new {id = setModel.Id}, setModel.ToDto());
        }

        [HttpPut("{id:guid}")]
        public async Task<ActionResult<SetDto>> Update([FromRoute] Guid id, [FromBody] UpdateSetDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var setModel = await _repository.UpdateSetAsync(id, dto);

            return (setModel is null) ?
                NotFound("Set does not exist") : Ok(setModel.ToDto());
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var setModel = await _repository.DeleteSetByIdAsync(id);

            return (setModel is null) ?
                NotFound("Set does not exist") : NoContent();
        }
    }
}