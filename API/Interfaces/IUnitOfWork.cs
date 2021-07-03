using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IItemRepository ItemRepository {get;}
        ITagRepository TagRepository {get;}
        ILocationRepository LocationRepository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}