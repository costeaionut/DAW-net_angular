using AutoMapper;
using DAW.Core;
using DAW.Core.BusinessObject;
using DAW.Dto;
using DAW.Dto.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DAW.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly UserManager<User> _userManager;
        private readonly JwtHandler _jwtHandler;
        private readonly IMapper _mapper;

        public AuthController(UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler)
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterUser([FromBody] RegisterFormDto userRegister)
        {
            if (userRegister == null || !ModelState.IsValid)
                return BadRequest();

            if (await _userManager.FindByEmailAsync(userRegister.Email) != null)
                return BadRequest("Email already in use");

            var user = _mapper.Map<User>(userRegister);
            var result = await _userManager.CreateAsync(user, userRegister.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegistrationResponseDto { Errors = errors });
            }

            return StatusCode(201);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            var user = await _userManager.FindByEmailAsync(userForAuthentication.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });
            
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);

            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
        }

        [HttpGet("GetCurrentUser"), Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            var identity = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identity.Claims;

            var email = claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (email == null)
                return BadRequest("There is no user logged in");

            User user = await _userManager.FindByEmailAsync(email);

            return Ok(new
            {
                id = user.Id,
                firstName = user.FirstName,
                lastName = user.LastName,
                email = user.Email,
                role = user.Role
            });
        } 
    
        [HttpGet("GetUserById/{userId}")]
        public async Task<ActionResult<User>> GetUserById(string userId)
            => userId == null ? BadRequest("ID is not valid!") 
                                : await _userManager.FindByIdAsync(userId);
    }
}
