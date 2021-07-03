using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Model
{
  public class LocationRepository : ILocationRepository
  {
    private readonly IMapper _mapper;
    private readonly DataContext _context;
    public LocationRepository(DataContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public void AddLocation(Location location)
    {
      _context.Locations.Add(location);
    }

    public void DeleteLocation(Location location)
    {
      _context.Locations.Remove(location);
    }

    public async Task<Location> GetLocation(int id)
    {
      return await _context.Locations.FindAsync(id);
    }

    public async Task<IEnumerable<LocationDto>> GetLocations()
    {
      return await _context.Locations
        .ProjectTo<LocationDto>(_mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public void UpdateLocation(Location location)
    {
      _context.Entry(location).State = EntityState.Modified;
    }
  }
}