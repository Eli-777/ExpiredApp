using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Model
{
  public class DataContext: DbContext
  {
    public DataContext(DbContextOptions options): base(options)
    {
    }

    public DbSet<Item> Items { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Location> Locations { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      // builder.Entity<Item>()
      //   .HasOne(i => i.TagId)
      //   .WithMany(t => t.Items)
      //   .HasForeignKey(i => i.Id);

      // builder.Entity<Tag>()
      //   .HasMany(t => t.Items)
      //   .WithOne(i => i.TagId)
      //   .HasForeignKey(t => t.Id);

    }

  }
}