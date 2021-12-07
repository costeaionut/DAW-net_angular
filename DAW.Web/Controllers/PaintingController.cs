using AutoMapper;
using DAW.Core.Abstraction;
using DAW.Core.BusinessObject;
using DAW.Dto.Paintings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAW.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaintingController : Controller
    {
        private readonly IPaintingManager _paintingManager;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public PaintingController(IPaintingManager paintingManager, IMapper mapper, UserManager<User> userManager)
        {
            _paintingManager = paintingManager;
            _mapper = mapper;
            _userManager = userManager;
        }

        [Authorize(Roles = "Seller")]
        [HttpPost("CreatePainting")]
        public async Task<ActionResult<Painting>> CreatePainting([FromBody] NewPaintingDto paintToBeCreated)
        {
            if (paintToBeCreated == null)
                return BadRequest("Painting data were not sent");

            Painting paint = _mapper.Map<Painting>(paintToBeCreated);

            //TODO: Check model validity

            var paintinEntry = await _paintingManager.CreatePaintingAsync(paint);

            if (paintinEntry == null)
                return BadRequest("There was an error when adding the paining to the database.");

            return paintinEntry;
        }

        [HttpGet("GetUserPaintings/{painterId}")]
        public async Task<IActionResult> GetPaintersPaints(string painterId)
        {
            if (painterId == null)
                return BadRequest("PainterId can't be null");

            var painter = await _userManager.FindByIdAsync(painterId);
            if (painter == null)
                return BadRequest("There is no painter with this ID");

            var paintings = _paintingManager.GetPaintingsByPainter(painterId);
            if (paintings == null)
                return BadRequest("There was an error retriving your data");

            return Ok(paintings);
        }

        [HttpGet("GetAllPaintings")]
        public ActionResult<List<Painting>> GetAllPaintings()
            => _paintingManager.GetAllPaintings();

        [HttpGet("GetPainting/{id}")]
        public ActionResult<Painting> GetPaintingById(Guid id)
        {
            if (Guid.Empty == id || id == null)
                return BadRequest("Id wasn't sent");

            var paint = _paintingManager.GetPaintingById(id);

            if (paint == null)
                return BadRequest("Painting couldn't be found");

            return paint;
        }

        [Authorize(Roles = "Seller")]
        [HttpPut("UpdatePainting")]
        public async Task<IActionResult> UpdatePainting([FromBody] PaintingDto painting)
        {
            var paintingToBeUpdated = _mapper.Map<Painting>(painting);
            
            var updatedPainting = await _paintingManager.UpdatePaintingAsync(paintingToBeUpdated);

            if (updatedPainting == null)
                return StatusCode(500, "There was an error updating the item");

            return Ok(updatedPainting);
        }

        [HttpDelete("DeletePainting")]
        [Authorize(Roles = "Seller")]
        public async Task<IActionResult> DeletePainting([FromBody] PaintingDto painting)
        {
            if (painting == null)
                return BadRequest("No painting was sent");

            var paintingToBeDeleted = _mapper.Map<Painting>(painting);

            var res = await _paintingManager.DeletePainting(paintingToBeDeleted);

            if (res == false)
                return BadRequest("There was a problem deleting your entry!");

            return Ok();
        }
    }
}
