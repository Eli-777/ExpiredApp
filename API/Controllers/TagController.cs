using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class TagController : baseController
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public TagController(IUnitOfWork unitOfWork, IMapper mapper)
    {
      _mapper = mapper;
      _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TagDto>>> GetTags()
    {
      var tags = await _unitOfWork.TagRepository.GetTags();

      return Ok(tags);
    }

    [HttpPost]
    public async Task<ActionResult> AddTag(Tag tag)
    {
      _unitOfWork.TagRepository.AddTag(tag);

      if (await _unitOfWork.Complete()) return Ok();

      var response = new ErrorResponse
      {
        message = "Problem adding the tag"
      };

      return BadRequest(response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateTag(int id, TagDto tag)
    {
      var originalTag = await _unitOfWork.TagRepository.GetTag(id);

      var response = new ErrorResponse
      {
        message = "Problem updating the tag"
      };
      if (originalTag == null) return NotFound(response);

      tag.TagId = id;
      var changedTag = _mapper.Map(tag, originalTag);
      _unitOfWork.TagRepository.UpdateTag(changedTag);

      if (await _unitOfWork.Complete()) return Ok();

      response.message = "Problem updating the tag";

      return BadRequest(response);

    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTag(int id)
    {
      var tag = await _unitOfWork.TagRepository.GetTag(id);
      var response = new ErrorResponse
      {
        message = "tag is not exit"
      };
      if (tag == null) return BadRequest(response);

      _unitOfWork.TagRepository.DeleteTag(tag);
      if (await _unitOfWork.Complete()) return Ok();

      response.message = "Problem deleting tag";

      return BadRequest(response);

    }
  }
}