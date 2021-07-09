using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IItemRepository
    {
        Task<IEnumerable<ItemDto>> GetItems(int userId, ItemParams itemParams);
        void AddItem(Item item);
        void DeleteItem(Item item);
        Task<Item> GetItem(int userId, int itemId);
        void Update(Item item);
        Task<ItemDto> GetAddedItem();

    }
}