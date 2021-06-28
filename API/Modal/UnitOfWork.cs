using System.Threading.Tasks;
using API.Interfaces;

namespace API.Modal
{
  public class UnitOfWork : IUnitOfWork
  {
    private readonly DataContext _context;
    public UnitOfWork(DataContext context)
    {
      _context = context;
    }

    public IItemRepository ItemRepository => new ItemRepository(_context);

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