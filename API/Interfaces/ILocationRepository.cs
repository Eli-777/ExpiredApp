using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Entities;

namespace API.Interfaces
{
  public interface ILocationRepository
    {
        Task<IEnumerable<LocationDto>> GetLocations();
        Task<Location> GetLocation(int id);

        void AddLocation(Location location);
        void DeleteLocation(Location location);
        void UpdateLocation(Location location);
        
    }
}