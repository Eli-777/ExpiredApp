using System.Threading.Tasks;
using API.Interfaces;
using AutoMapper;

namespace API.Model
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public UnitOfWork(DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public IItemRepository ItemRepository => new ItemRepository(_context, _mapper);
    public ITagRepository TagRepository => new TagRepository(_context, _mapper);
    public ILocationRepository LocationRepository => new LocationRepository(_context, _mapper);

    public IUserRepository UserRepository =>  new UserRepository(_context);

    public async Task<bool> Complete()
    {
      return await _context.SaveChangesAsync() > 0;
    }

    public bool HasChanges()
    {
      return _context.ChangeTracker.HasChanges();
    }
  }
}