using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Model
{
  public class ItemRepository : IItemRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public ItemRepository(DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public void AddItem(Item item)
    {
      _context.Items.Add(item);
    }

    public void DeleteItem(Item item)
    {
      _context.Items.Remove(item);
    }

    public async Task<Item> GetItem(int id)
    {
      return await _context.Items.FindAsync(id);
    }

    public async Task<IEnumerable<ItemDto>> GetItems(ItemParams itemParams)
    {
      var query = _context.Items.AsQueryable();
      var today = DateTime.UtcNow;
      
      if (itemParams.IsExpired)
      {
        query = query.Where(Items => Items.ExpiryDate < today);
      }
      if (itemParams.FromExpiredDay > 0)
      {
        var maxDate = today + TimeSpan.FromDays(itemParams.FromExpiredDay);
        query = query.Where(Items => Items.ExpiryDate < maxDate && Items.ExpiryDate > today);
      }
      return await query.ProjectTo<ItemDto>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<ItemDto> GetAddedItem()
    {
      return await _context.Items
        .OrderBy(Items => Items.CreatedDate)
        .ProjectTo<ItemDto>(_mapper.ConfigurationProvider)
        .LastOrDefaultAsync();
    }

    public void Update(Item item)
    {
      _context.Entry(item).State = EntityState.Modified;
    }
  }
}