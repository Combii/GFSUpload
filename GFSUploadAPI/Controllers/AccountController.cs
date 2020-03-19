using System.Threading.Tasks;
using AutoMapper;
using GFSUploadAPI.Dtos;
using GFSUploadAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GFSUploadAPI.Controllers
{
  [AllowAnonymous]
  [Route("api/[controller]")]
  public class AccountController : Controller
  {
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private IMapper _mapper;

    public AccountController(UserManager<IdentityUser> userManager,
      SignInManager<IdentityUser> signInManager,
      IMapper mapper)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult Register()
    {
      return Ok();
    }

    // https://youtu.be/TfarnVqnhX0?t=237
    [HttpPost("register")]
    public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
    {
      var result = await _userManager.CreateAsync(new IdentityUser(userForRegisterDto.Username), userForRegisterDto.Password);

      return Ok(new
      {
        user = result
      });
    }
  }
}
