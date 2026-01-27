using Microsoft.AspNetCore.Mvc;
using Repeet.DTOs.Flashcard;
using Repeet.Interfaces;
using Repeet.Mappers;
using Repeet.Models;

namespace Repeet.Controllers
{
    [Route("flashcards/")]
    [ApiController]
    public partial class FlashcardController(IFlashcardService service) : ControllerBase
    {
        private readonly IFlashcardService _service = service;
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashcardDto>>> GetAll()
        {
            var flashcards = await _service.GetAllAsync();

            return Ok(flashcards.Select(fsc => fsc.toDto()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FlashcardDto>> Get([FromRoute] Guid id)
        {
            var fsc = await _service.GetAsync(id);

            return (fsc is null) ?
                    NotFound() : Ok(fsc.toDto());
        }

        [HttpPost]
        public async Task<ActionResult<FlashcardDto>> Create([FromBody] CreateFlashcardDto dto)
        {
            // Create a new model from DTO
            var fscModel = await _service.CreateAsync(new Flashcard {
                Id = Guid.NewGuid(),
                Keyword = dto.Keyword,
                Definition = dto.Definition
            });

            // 201 response code
            return CreatedAtAction(nameof(Get), new {id = fscModel.Id}, fscModel.toDto());
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult<FlashcardDto>> Update([FromRoute] Guid id, [FromBody] UpdateFlashcardDto dto)
        {
            var fscModel = await _service.UpdateAsync(id, dto);

            return (fscModel is null) ?
                NotFound() : Ok(fscModel.toDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var fscModel = await _service.DeleteAsync(id);

            return (fscModel is null) ?
                NotFound() : NoContent();
        }
    }


    
}