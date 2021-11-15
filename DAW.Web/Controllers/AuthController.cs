using DAW.Dto;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DAW.Web.Controllers
{
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        public AuthController()
        {

        }

        [HttpPost]
        public IActionResult RegisterUser([FromBody] RegisterFormDto userRegister)
        {
            return Ok();
        }
    }
}
