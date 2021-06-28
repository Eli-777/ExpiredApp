using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Modal
{
  public class Seed
  {
    public static async Task SeedItems(DataContext context)
    {
        if(await context.Items.AnyAsync()) return;

        var itemData = await System.IO.File.ReadAllTextAsync(
            "Modal/ItemsSeed.json"
        );

        var items = JsonSerializer.Deserialize<List<Item>>(itemData);

        foreach(var item in items)
        {
            context.Items.Add(item);
        }

        await context.SaveChangesAsync();
    }
  }
}