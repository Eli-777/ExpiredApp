using API.Dtos;
using API.Entities;
using AutoMapper;

namespace API.Services
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
        CreateMap<ItemDto, Item>();
        CreateMap<Item, ItemDto>();
        CreateMap<TagDto, Tag>();
        CreateMap<Tag, TagDto>();
        CreateMap<LocationDto, Location>();
        CreateMap<Location, LocationDto>();
    }
  }
}