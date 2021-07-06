using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ItemController : baseController
  {
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ItemController(IUnitOfWork unitOfWork, IMapper mapper)
    {
      _mapper = mapper;
      _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ItemDto>>> GetItems([FromQuery] ItemParams itemParams)
    {
      var items = await _unitOfWork.ItemRepository.GetItems(itemParams);

      return Ok(items);

    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ItemDto>> GetItem(int id)
    {
      var item = await _unitOfWork.ItemRepository.GetItem(id);
      var response = new
      {
        message = "this item is not found"
      };

      if (item == null) return NotFound(response);

      var itemToReturn = _mapper.Map<ItemDto>(item);
      return Ok(itemToReturn);

    }

    [HttpPost]
    public async Task<ActionResult<ItemDto>> AddItem(NewItem item)
    {
      var response = new ErrorResponse { };
      var addItem = new Item{
        ItemName = item.ItemName,
        ManufacturingDate = item.ManufacturingDate,
        ExpiryDate = item.ExpiryDate,
        GuaranteePeriod = item.GuaranteePeriod,
        PhotoUrl = item.PhotoUrl
      };
      
      if (item.Tag > 0)
      {
        var tagIid = item.Tag;
        var selectTag = await _unitOfWork.TagRepository.GetTag(tagIid);

        response.message = "Tag is not found";
        if (selectTag == null) return NotFound(response);
        addItem.Tag = selectTag;
      }

      if (item.Location > 0)
      {
        var locationId = item.Location;
        var selectLocation = await _unitOfWork.LocationRepository.GetLocation(locationId);
        response.message = "Location is not found";
        if (selectLocation == null) return NotFound(response);
        addItem.Location = selectLocation;
      }
   

      _unitOfWork.ItemRepository.AddItem(addItem);

      if (await _unitOfWork.Complete())
      {
        var newItem = await _unitOfWork.ItemRepository.GetAddedItem();
        return Ok(newItem);
      };

      response.message = "Problem adding the item";

      return BadRequest(response);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteItem(int id)
    {
      var item = await _unitOfWork.ItemRepository.GetItem(id);
      if (item == null) return BadRequest("item is not exist");

      _unitOfWork.ItemRepository.DeleteItem(item);
      var response = new
      {
        message = $"the item with id = {id}  is delete"
      };
      if (await _unitOfWork.Complete()) return Ok(response);

      return BadRequest("Problem deleting the item");
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> SetItem(int id, ItemDto item)
    {
      var response = new ErrorResponse
      {
        message = "put data id not equal to put route id"
      };
      if (id != item.Id) return BadRequest(response);

      var originalItem = await _unitOfWork.ItemRepository.GetItem(item.Id);
      var newTag = await _unitOfWork.TagRepository.GetTag(item.Tag.Id);
      var newLocation = await _unitOfWork.LocationRepository.GetLocation(item.Location.Id);

      response.message = "This item is not found";
      if (originalItem == null) return NotFound(response);
      response.message = "new select Tag is not Found";
      if (newTag == null) return NotFound(response);
      response.message = "new select Location is not Found";
      if (newLocation == null) return NotFound(response);

      originalItem.Tag = newTag;
      originalItem.Location = newLocation;

      var changedItem = _mapper.Map(item, originalItem);
      _unitOfWork.ItemRepository.Update(changedItem);

      response.message = "item is changed!";
      if (await _unitOfWork.Complete()) return Ok(response);

      return BadRequest("Problem setting the item");


    }

  }
}