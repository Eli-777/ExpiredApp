using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class AccountController : baseController
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;

    public AccountController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService,
        IMapper mapper
    )
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _tokenService = tokenService;
      _mapper = mapper;
    }

 

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      var response = new ErrorResponse
      {
        message = "Account is taken"
      };
      if (await UserExit(registerDto.Username)) return BadRequest(response);

      var user = _mapper.Map<AppUser>(registerDto);
      user.Email = user.UserName;

      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if (!result.Succeeded) return BadRequest(result.Errors);

      var roleResult = await _userManager.AddToRoleAsync(user, "Member");
      if (!roleResult.Succeeded) return BadRequest(result.Errors);

      return new UserDto
      {
        Username = user.UserName,
        Token = await _tokenService.CreateToken(user),
      };

    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.Users
        .SingleOrDefaultAsync(u => u.UserName == loginDto.UserName);

      var response = new ErrorResponse
      {
        message = "Invalid account"
      };
      if (user == null) return Unauthorized(response);

      var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

      response.message = "Password is wrong";
      if (!result.Succeeded) return Unauthorized(response);

      return new UserDto
      {
        Username = user.UserName,
        Token = await _tokenService.CreateToken(user)
      };

    }

    public async Task<bool> UserExit(string username)
    {
      return await _userManager.Users.AnyAsync(x => x.UserName == username.ToLower());
    }
  }
}