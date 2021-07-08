using API.Dtos;
using API.Entities;
using AutoMapper;

namespace API.Services
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
        CreateMap<ItemDto, Item>()
          .ForMember(d => d.PhotoUrl, o => o.Condition(o => o.PhotoUrl == null));
        CreateMap<Item, ItemDto>();
        CreateMap<TagDto, Tag>();
        CreateMap<Tag, TagDto>();
        CreateMap<LocationDto, Location>();
        CreateMap<Location, LocationDto>();
        CreateMap<RegisterDto, AppUser>();
    }
  }
}