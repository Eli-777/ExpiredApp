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
    public async Task<ActionResult<IEnumerable<Item>>> GetItems()
    {
      var items = await _unitOfWork.ItemRepository.GetItems();

      return Ok(items);

    }

    [HttpPost]
    public async Task<ActionResult> AddItem(Item item)
    {
      _unitOfWork.ItemRepository.AddItem(item);
      var response = new {
        message = "this item is added!"
      };
      if (await _unitOfWork.Complete()) return Ok(response);

      return BadRequest("Problem adding the item");
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