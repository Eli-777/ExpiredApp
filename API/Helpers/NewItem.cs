using System;
using Microsoft.AspNetCore.Http;

namespace API.Helpers
{
  public class NewItem
    {
        public string ItemName { get; set; }
        public Nullable<DateTime> ManufacturingDate { get; set; }
        public Nullable<DateTime> ExpiryDate { get; set; }
        public int GuaranteePeriod { get; set; }
        public int Tag { get; set; }
        public int Location { get; set; }
        public string PhotoUrl { get; set; }

        public string PhotoFile { get; set; }
    }
}