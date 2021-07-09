using System.Collections.Generic;
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
  public class LocationController : baseController
  {
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    public LocationController(IUnitOfWork unitOfWork, IMapper mapper)
    {
      _unitOfWork = unitOfWork;
      _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<LocationDto>>> GetLocations()
    {
      var userId = User.GetUserId();
      var locations = await _unitOfWork.LocationRepository.GetLocationsForUser(userId);
      return Ok(locations);
    }

    [HttpPost]
    public async Task<ActionResult> AddLocation(Location location)
    {
      var userId = User.GetUserId();
      var user = await _unitOfWork.UserRepository.GetUser(userId);
      location.AppUser = user;
      _unitOfWork.LocationRepository.AddLocation(location);
      if (await _unitOfWork.Complete()) return Ok();

      var response = new ErrorResponse
      {
        message = "Problem adding the location"
      };

      return BadRequest(response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateLocation(int id, LocationDto location)
    {
      var oringinLocation = await _unitOfWork.LocationRepository.GetLocation(id);
      var response = new ErrorResponse
      {
        message = "Not found this location"
      };
      if (oringinLocation == null) return NotFound(response);

      location.Id = id;
      var changedLocation = _mapper.Map(location, oringinLocation);
      _unitOfWork.LocationRepository.UpdateLocation(changedLocation);

      if (await _unitOfWork.Complete()) return Ok();

      response.message = "Problem updating the location";

      return BadRequest(response);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteLocation(int id)
    {
      var location = await _unitOfWork.LocationRepository.GetLocation(id);
      var response = new ErrorResponse
      {
        message = "Not found the location"
      };
      if (location == null) return NotFound(response);

      _unitOfWork.LocationRepository.DeleteLocation(location);

      if (await _unitOfWork.Complete()) return Ok();

      response.message = "Problem deleting the location";
      return BadRequest(response);
    }
  }
}