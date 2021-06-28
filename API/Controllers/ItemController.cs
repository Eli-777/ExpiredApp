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
      if (await _unitOfWork.Complete()) return Ok("this item is added!");

      return BadRequest("Problem adding the item");
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteItem(int id)
    {
      var item = await _unitOfWork.ItemRepository.GetItem(id);
      _unitOfWork.ItemRepository.DeleteItem(item);
      if (await _unitOfWork.Complete()) return Ok($"the item with id = {id}  is delete");

      return BadRequest("Problem deleting the item");
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> SetItem(int id, ItemDto item)
    {
      var originalItem = await _unitOfWork.ItemRepository.GetItem(id);
      item.Id = id;
      var changedItem =  _mapper.Map(item, originalItem);

      _unitOfWork.ItemRepository.Update(changedItem);
      if (await _unitOfWork.Complete()) return Ok("item is changed!");

      return BadRequest("Problem setting the item");


    }
  }
}