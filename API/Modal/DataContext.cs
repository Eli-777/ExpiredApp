using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Modal
{
  public class DataContext: DbContext
  {
    public DataContext(DbContextOptions options): base(options)
    {
    }

    public DbSet<Item> Items { get; set; }

  }
}