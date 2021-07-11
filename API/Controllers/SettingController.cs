using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
  public class SettingController : baseController
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    public SettingController(IUnitOfWork unitOfWork, IMapper mapper)
    {
      _mapper = mapper;
      _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<SettingDto>> GetSetting()
    {
      var userId = User.GetUserId();
      var user = await _unitOfWork.UserRepository.GetUser(userId);
      var setting = await _unitOfWork.SettingRepository.GetSettingForUser(userId);

      var response = new ErrorResponse
      {
        message = "This user setting is not found"
      };
      if (setting == null || user == null) return NotFound(response);
       var settingDto = _mapper.Map<SettingDto>(setting);
       settingDto.KnownAs = user.KnownAs;
      return settingDto;
    }

    [HttpPut]
    public async Task<ActionResult> UpdateSetting(SettingDto settingDto)
    {
      var userId = User.GetUserId();
      var user = await _unitOfWork.UserRepository.GetUser(userId);
      user.KnownAs = settingDto.KnownAs;
      var originSetting = await _unitOfWork.SettingRepository.GetSettingForUser(userId);
      _mapper.Map(settingDto, originSetting);

      _unitOfWork.UserRepository.UpdateUser(user);
      _unitOfWork.SettingRepository.UpdateSetting(originSetting);
      if (await _unitOfWork.Complete()) return Ok();

      var response = new ErrorResponse
      {
        message = "Updating setting is fail"
      };
      return BadRequest(response);

    }
  }
}