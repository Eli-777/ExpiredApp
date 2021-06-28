using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IItemRepository
    {
        Task<IEnumerable<Item>> GetItems();
        void AddItem(Item item);
        void DeleteItem(Item item);
        Task<Item> GetItem(int id);
        void Update(Item item);

    }
}