using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Model
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext _context;
    public UserRepository(DataContext context)
    {
      _context = context;
    }

    public async Task<AppUser> GetUser(int id)
    {
      return await _context.Users
        .Include(u => u.Items)
        .SingleOrDefaultAsync(u => u.Id == id);
    }

    public void UpdateUser(AppUser user)
    {
      _context.Users.Update(user);
    }
  }
}