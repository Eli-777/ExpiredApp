using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface ISettingRepository
    {
        Task<Setting> GetSettingForUser(int userId);
        void UpdateSetting(Setting setting);
    }
}