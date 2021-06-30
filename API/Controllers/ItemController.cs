using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
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
    public async Task<ActionResult<IEnumerable<ItemDto>>> GetItems()
    {
      var items = await _unitOfWork.ItemRepository.GetItems();
      var itemsToReturn =  _mapper.Map<IEnumerable<ItemDto>>(items);

      return Ok(itemsToReturn);

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

      var itemToReturn =  _mapper.Map<ItemDto>(item);
      return Ok(itemToReturn);

    }

    [HttpPost]
    public async Task<ActionResult<ItemDto>> AddItem(Item item)
    {
      _unitOfWork.ItemRepository.AddItem(item);     
      
      if (await _unitOfWork.Complete()) 
      {
        var newItem = await _unitOfWork.ItemRepository.GetAddedItem();
        var changedItem =  _mapper.Map<ItemDto>(newItem);
        return Ok(changedItem);
      };

      var response = new {
        message = "Problem adding the item"
      };

      return BadRequest(response);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteItem(int id)
    {
      var item = await _unitOfWork.ItemRepository.GetItem(id);
      if (item == null) return BadRequest("item is not exist");
      
      _unitOfWork.ItemRepository.DeleteItem(item);
      var response = new {
        message = $"the item with id = {id}  is delete"
      };
      if (await _unitOfWork.Complete()) return Ok(response);

      return BadRequest("Problem deleting the item");
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> SetItem(int id, ItemDto item)
    {
      var originalItem = await _unitOfWork.ItemRepository.GetItem(id);
      item.Id = id;
      var changedItem =  _mapper.Map(item, originalItem);

      _unitOfWork.ItemRepository.Update(changedItem);
      var response = new {
        message = "item is changed!"
      };
      if (await _unitOfWork.Complete()) return Ok(response);

      return BadRequest("Problem setting the item");


    }
    
  }
}