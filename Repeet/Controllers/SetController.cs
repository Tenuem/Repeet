using Microsoft.AspNetCore.Mvc;
using Repeet.Data;
using Repeet.Dto;
using Repeet.Models;

namespace Repeet.Controllers
{
    [Route("sets/")]
    [ApiController]
    public class SetController(ApplicationDBContext db) : ControllerBase
    {
        private readonly ApplicationDBContext _db = db;

        [HttpGet]
        public IActionResult GetAll()
        {
            var sets = _db.Sets.ToList()
                .Select(s => new SetDto(s.Id, s.Name));

            return Ok(sets);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var set = _db.Sets.Find(id);
            return set is null ?
                    NotFound() : Ok(new SetDto(set.Id, set.Name));
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateSetDto dto)
        {
            // Create a new model from DTO
            var setModel = new Set {
                Id = Guid.NewGuid(),
                Name = dto.Name
            };

            _db.Sets.Add(setModel);
            _db.SaveChanges();

            // 201 response code
            return CreatedAtAction(nameof(GetById), new {id = setModel.Id}, new SetDto(setModel.Id, setModel.Name));
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromRoute] Guid id, [FromBody] UpdateSetDto dto)
        {
            var setModel = _db.Sets.FirstOrDefault(s => s.Id == id);
            if (setModel is null)
                return NotFound();

            setModel.Name = dto.Name;
            _db.SaveChanges();

            return Ok(new SetDto(setModel.Id, setModel.Name));
        }

        [HttpDelete("{id}")]
        public IActionResult Delete (Guid id)
        {
            var setModel = _db.Sets.FirstOrDefault(s => s.Id == id);
            if (setModel is null)
                return NotFound();

            _db.Sets.Remove(setModel);
            _db.SaveChanges();

            return NoContent();
        }
    }
}