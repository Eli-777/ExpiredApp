using System;
using System.ComponentModel.DataAnnotations;

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
    }
}