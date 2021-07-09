using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;

namespace API.Model
{
  public class SettingRepository : ISettingRepository
  {
    private readonly DataContext _context;
    public SettingRepository(DataContext context)
    {
      _context = context;
    }

    public async Task<Setting> GetSettingForUser(int userId)
    {
      return await _context.Settings.FindAsync(userId);
    }

    public void UpdateSetting(Setting setting)
    {
      _context.Settings.Update(setting);
    }
  }
}