using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
  public class ItemDto
    {
        public int Id { get; set; }
        [Required]
        public string ItemName { get; set; }
        public Nullable<DateTime> ManufacturingDate { get; set; }
        public Nullable<DateTime> ExpiryDate { get; set; }
        public int GuaranteePeriod { get; set; }
        public TagDto Tag { get; set; }
        public LocationDto Location { get; set; }
        public string PhotoUrl { get; set; }
        public string PhotoFile { get; set; }
    }
}