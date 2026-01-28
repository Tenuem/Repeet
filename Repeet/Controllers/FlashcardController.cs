using Microsoft.AspNetCore.Mvc;
using Repeet.DTOs.Flashcard;
using Repeet.Helpers;
using Repeet.Interfaces;
using Repeet.Mappers;

namespace Repeet.Controllers
{
    [Route("flashcards/")]
    [ApiController]
    public partial class FlashcardController(IFlashcardService service) : ControllerBase
    {
        private readonly IFlashcardService _service = service;
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashcardDto>>> GetAll([FromQuery] QueryObject qo)
        {
            var flashcards = await _service.GetAllAsync(qo);

            return Ok(flashcards.Select(fsc => fsc.ToDto()));
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<FlashcardDto>> Get([FromRoute] Guid id)
        {
            var fsc = await _service.GetAsync(id);

            return (fsc is null) ?
                    NotFound("Flashcard does not exist") : Ok(fsc.ToDto());
        }
        
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<FlashcardDto>> Update([FromRoute] Guid id, [FromBody] UpdateFlashcardDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var fscModel = await _service.UpdateAsync(id, dto);

            return (fscModel is null) ?
                NotFound("Flashcard does not exist") : Ok(fscModel.ToDto());
        }

        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var fscModel = await _service.DeleteAsync(id);

            return (fscModel is null) ?
                NotFound("Flashcard does not exist") : NoContent();
        }
    }


    
}