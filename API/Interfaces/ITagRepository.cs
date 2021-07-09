using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;

namespace API.Interfaces
{
    public interface ITagRepository
    {
        Task<IEnumerable<TagDto>> GetTags();
        Task<IEnumerable<TagDto>> GetTagsForUser(int userId);
        Task<Tag> GetTag(int id);
        void AddTag(Tag tag);
        void DeleteTag(Tag tag);
        void UpdateTag(Tag tag);
    }
}