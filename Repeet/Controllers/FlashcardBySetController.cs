using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Repeet.DTOs.Flashcard;
using Repeet.Helpers;
using Repeet.Interfaces;
using Repeet.Mappers;
using Repeet.Models;

namespace Repeet.Controllers
{
    [Route("sets/{setId:guid}/flashcards/")]
    [ApiController]
    public class FlashcardBySetController(IFlashcardService service, UserManager<User> userManager) : ControllerBase
    {
        private readonly IFlashcardService _service = service;
        private readonly UserManager<User> _userManager = userManager;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<FlashcardDto>>> GetAll([FromQuery] QueryObject qo, [FromRoute] Guid setId)
        {
            var flashcards = await _service.GetAllAsync(qo, setId);

            return Ok(flashcards.Select(fsc => fsc.ToDto()));
        }

        [HttpGet("{id:guid}")]
        public async Task<ActionResult<FlashcardDto>> Get([FromRoute] Guid setId, [FromRoute] Guid FscId)
        {
            if (!await _service.SetExists(setId))
                return BadRequest("Set does not exists");

            var fsc = await _service.GetAsync(FscId);

            return (fsc is null) ?
                    NotFound("Flashcard does not exist") : Ok(fsc.ToDto());
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<FlashcardDto>> Create([FromRoute] Guid setId, [FromBody] CreateFlashcardDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);        

            if (!await _service.SetExists(setId))
                return BadRequest("Set does not exists");

            // Check if this set belongs to the user
            var username = User.Identity!.Name;
            if (username is null)
                return BadRequest("You have to be logged in to update sets");

            var user = await _userManager.FindByNameAsync(username);
            var setOwner = await _service.IsSetOwner(setId, user!.Id);

            if (!setOwner)
                return BadRequest("You can add flashcards only your sets");

            // Create a new model from DTO assigned to the set
            var fscModel = await _service.CreateAsync(new Flashcard {
                Id = Guid.NewGuid(),
                Keyword = dto.Keyword,
                Definition = dto.Definition,
                OwnerId = user.Id,
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