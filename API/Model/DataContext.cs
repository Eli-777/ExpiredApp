using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Model
{
  public class DataContext: IdentityDbContext<
    AppUser, AppRole, int, 
    IdentityUserClaim<int>, AppUserRole, 
    IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>
  >
  {
    public DataContext(DbContextOptions options): base(options)
    {
    }

    public DbSet<Item> Items { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Location> Locations { get; set; }
    public DbSet<Setting> Settings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      builder.Entity<AppUser>()
        .HasMany(ur => ur.UserRoles)
        .WithOne(u => u.User)
        .HasForeignKey(ur => ur.UserId)
        .IsRequired();
      builder.Entity<AppRole>()
        .HasMany(ur => ur.UserRoles)
        .WithOne(u => u.Role)
        .HasForeignKey(ur => ur.RoleId)
        .IsRequired();

      builder.Entity<AppUser>()
        .HasOne(ur => ur.Setting)
        .WithOne(s => s.AppUser)
        .HasForeignKey<Setting>(s => s.id)
        .IsRequired();
        
    }

  }
}