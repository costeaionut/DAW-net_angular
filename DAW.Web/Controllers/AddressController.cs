using DAW.Core.Abstraction;
using DAW.Core.BusinessObject;
using DAW.Data.Managers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAW.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {

        private readonly IAddressManager _addressManager;

        public AddressController(IAddressManager addressManager)
        {
            _addressManager = addressManager;
        }

        [HttpPost("AddAddress")]
        public async Task<ActionResult<Address>> AddUserAddress([FromBody]Address address)
        {
            if (address == null)
                return BadRequest("Address is empty");

            return await _addressManager.CreateAddressAsync(address);

        }

        [HttpGet("UserAddress/{userId}")]
        public ActionResult<Address> UserAddress(string userId)
        {
            if (userId == null)
                return BadRequest("User's ID can't be empty");

            var address = _addressManager.GetAddressByUserId(userId);

            return address == null ? NoContent() : address;
        }

        [HttpDelete("DeleteAddress")]
        public async Task<IActionResult> DeleteUserAddress([FromBody] Address address)
        {
            if (address == null)
                return BadRequest("Address can't be null!");

            await _addressManager.DeleteAddressAsync(address);

            return Ok();
        }

    }
}
