using AutoMapper;
using DAW.Core;
using DAW.Core.BusinessObject;
using DAW.Dto;
using DAW.Dto.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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

    }
}
