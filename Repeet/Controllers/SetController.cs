using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repeet.Data;
using Repeet.Dto;
using Repeet.Models;
using Repeet.Interfaces;

namespace Repeet.Controllers
{
    [Route("sets/")]
    [ApiController]
    public class SetController(ISetRepository repository) : ControllerBase
    {
        private readonly ISetRepository _repository = repository;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SetDto>>> GetAll()
        {
            var sets = await _repository.GetAllSetsAsync();
            var setDtos = sets.Select(s => new SetDto(s.Id, s.Name));

            return Ok(setDtos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SetDto>> Get(Guid id)
        {
            var set = await _repository.GetSetByIdAsync(id);

            return (set is null) ?
                    NotFound() : Ok(new SetDto(set.Id, set.Name));
        }

        [HttpPost]
        public async Task<ActionResult<SetDto>> Create([FromBody] CreateSetDto dto)
        {
            // Create a new model from DTO
            var setModel = await _repository.CreateSetAsync(new Set {
                Id = Guid.NewGuid(),
                Name = dto.Name
            });

            // 201 response code
            return CreatedAtAction(nameof(Get), new {id = setModel.Id}, new SetDto(setModel.Id, setModel.Name));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SetDto>> Update([FromRoute] Guid id, [FromBody] UpdateSetDto dto)
        {
            var setModel = await _repository.UpdateSetAsync(id, dto);

            return (setModel is null) ?
                NotFound() : Ok(new SetDto(setModel.Id, setModel.Name));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var setModel = await _repository.DeleteSetByIdAsync(id);

            return (setModel is null) ?
                NotFound() : NoContent();
        }
    }
}