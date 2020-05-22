using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GFSUploadAPI.Dtos;
using GFSUploadAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Microsoft.Extensions.Options;

namespace GFSUploadAPI.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IConfiguration _config;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IMapper _mapper;

        private readonly ApplicationSettings appSettings;

        public AuthController(IConfiguration config, UserManager<IdentityUser> userManager,
          SignInManager<IdentityUser> signInManager, IMapper mapper, IOptions<ApplicationSettings> appSettings)
        {
            this.appSettings = appSettings.Value;
            _config = config;
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
        {
            var userFromDb = await _userManager.FindByNameAsync(userForLoginDto.Username);
            if (userFromDb == null)
            {
                return Unauthorized();
            }

            var user = _mapper.Map<IdentityUser,UserForLoggedInDto>(userFromDb);

            var result = await _signInManager
                .CheckPasswordSignInAsync(userFromDb, userForLoginDto.Password, false);

            if (result.Succeeded)
            {
                var token = GenerateToken(userFromDb);

                return Ok(new { user, token });
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            var userFromDb = new IdentityUser(userForRegisterDto.Username);
            var result = await _userManager.CreateAsync(userFromDb, userForRegisterDto.Password);

            var user = _mapper.Map<IdentityUser,UserForLoggedInDto>(userFromDb);
            if (result.Succeeded)
            {
                return Ok(new
                {
                    token = GenerateToken(userFromDb),
                    user = user
                });
            }

            return BadRequest(result.Errors);
        }

        private string GenerateToken(IdentityUser user)
        {
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                   {
                        new Claim("UserID",user.Id.ToString())
                   }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new Microsoft.IdentityModel.Tokens.SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8
                       .GetBytes(appSettings.Token)), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var token = tokenHandler.WriteToken(securityToken);
            return token;
        }
    }
}
