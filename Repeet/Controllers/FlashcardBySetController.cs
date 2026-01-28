using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Repeet.DTOs.Flashcard;
using Repeet.Interfaces;
using Repeet.Mappers;
using Repeet.Models;

namespace Repeet.Controllers
{
    [Route("sets/{setId}/flashcards/")]
    [ApiController]
    public class FlashcardBySetController(IFlashcardService service) : ControllerBase
    {
        private readonly IFlashcardService _service = service;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashcardDto>>> GetAll([FromRoute] Guid setId)
        {
            var flashcards = await _service.GetAllAsync(setId);

            return Ok(flashcards.Select(fsc => fsc.ToDto()));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<FlashcardDto>> Get([FromRoute] Guid setId, [FromRoute] Guid FscId)
        {
            if (!await _service.SetExists(setId))
                return BadRequest("Set does not exists");

            var fsc = await _service.GetAsync(FscId);

            return (fsc is null) ?
                    NotFound() : Ok(fsc.ToDto());
        }

        [HttpPost]
        public async Task<ActionResult<FlashcardDto>> Create([FromRoute] Guid setId, [FromBody] CreateFlashcardDto dto)
        {

            if (!await _service.SetExists(setId))
                return BadRequest("Set does not exists");

            // Create a new model from DTO assigned to the set
            var fscModel = await _service.CreateAsync(new Flashcard {
                Keyword = dto.Keyword,
                Definition = dto.Definition,
                SetId = setId
            });
            
            // 201 response code
            return CreatedAtAction(
                actionName: nameof(FlashcardController.Get),
                controllerName: "Flashcard",
                routeValues: new {id = fscModel.Id}, 
                value: fscModel.ToDto()
            );
        }
    }
}