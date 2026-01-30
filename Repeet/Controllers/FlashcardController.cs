using Microsoft.AspNetCore.Authorization;
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
        
        [Authorize]
        [HttpPut("{id:guid}")]
        public async Task<ActionResult<FlashcardDto>> Update([FromRoute] Guid id, [FromBody] UpdateFlashcardDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var username = User.Identity!.Name;
            if (username is null)
                return BadRequest("You have to be logged in to update sets");

            var isOwner = await _service.IsFlashcardOwner(id, username);

            if (!isOwner)
                return BadRequest("You can update only your sets");
                
            var fscModel = await _service.UpdateAsync(id, dto);

            return (fscModel is null) ?
                NotFound("Flashcard does not exist") : Ok(fscModel.ToDto());
        }

        [Authorize]
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            // Check if this set belongs to the user
            var username = User.Identity!.Name;
            if (username is null)
                return BadRequest("You have to be logged in to update sets");

            var isOwner = await _service.IsFlashcardOwner(id, username);

            if (!isOwner)
                return BadRequest("You can delete only your sets");
        
            var fscModel = await _service.DeleteAsync(id);

            return (fscModel is null) ?
                NotFound("Flashcard does not exist") : NoContent();
        }
    }   
}