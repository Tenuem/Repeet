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

            return Ok(flashcards.Select(fsc => fsc.toDto()));
        }
    }
}