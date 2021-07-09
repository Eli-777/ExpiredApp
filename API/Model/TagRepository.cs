using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Model
{
  public class TagRepository : ITagRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public TagRepository(DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public void AddTag(Tag tag)
    {
      _context.Tags.Add(tag);
    }

    public void DeleteTag(Tag tag)
    {
      _context.Tags.Remove(tag);
    }

    public async Task<Tag> GetTag(int id)
    {
      return await _context.Tags.FindAsync(id);
    }

    public async Task<IEnumerable<TagDto>> GetTags()
    {
      return await _context.Tags
        .ProjectTo<TagDto>(_mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<IEnumerable<TagDto>> GetTagsForUser(int userId)
    {
      return await _context.Tags
        .AsQueryable()
        .Where(t => t.AppUser.Id == userId)
        .ProjectTo<TagDto>(_mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public void UpdateTag(Tag tag)
    {
      _context.Entry(tag).State = EntityState.Modified;
    }
  }
}