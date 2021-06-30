using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Model
{
  public class ItemRepository : IItemRepository
  {
    private readonly DataContext _context;
    public ItemRepository(DataContext context)
    {
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

    public async Task<IEnumerable<Item>> GetItems()
    {
      return await _context.Items.ToListAsync();
    }

    public async Task<Item> GetAddedItem()
    {
      return await _context.Items.OrderBy(Items => Items.CreatedDate).LastOrDefaultAsync();
    }

    public void Update(Item item)
    {
      _context.Entry(item).State = EntityState.Modified;
    }
  }
}