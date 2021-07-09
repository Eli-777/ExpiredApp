using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IItemRepository ItemRepository {get;}
        ITagRepository TagRepository {get;}
        ILocationRepository LocationRepository {get;}
        IUserRepository UserRepository {get;}
        ISettingRepository SettingRepository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}