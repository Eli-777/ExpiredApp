using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Model
{
  public class Seed
  {
    public static async Task SeedUsers(
      UserManager<AppUser> userManager,
      RoleManager<AppRole> roleManager
    )
    {
      if (await userManager.Users.AnyAsync()) return;

      var userData = await System.IO.File.ReadAllTextAsync(
          "Model/UserSeed.json"
      );

      var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
      if (users == null) return;


      var roles = new List<AppRole>
      {
        new AppRole{Name = "Member"},
        new AppRole{Name = "Admin"},
        new AppRole{Name = "Moderator"},
      };

      foreach (var role in roles)
      {
        await roleManager.CreateAsync(role);
      }

      //把裡面每一筆資料都加進 User table
      foreach (var user in users)
      {

        user.UserName = user.UserName.ToLower();

        await userManager.CreateAsync(user, "Test1234");
        //種子資料每個都加入 Member 角色
        await userManager.AddToRoleAsync(user, "Member");

      }

      //建立 admin 帳戶
      var admin = new AppUser
      {
        Email = "admin",
        UserName = "admin"
      };

      await userManager.CreateAsync(admin, "Test123456");
      //加入多個幾色
      await userManager.AddToRolesAsync(
        admin, new[] { "Admin", "Moderator" }
      );
    }
  }
}