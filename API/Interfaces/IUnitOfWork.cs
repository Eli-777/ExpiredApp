using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IItemRepository ItemRepository {get;}
        Task<bool> Complete();
        bool HasChanges();
    }
}