using System;

namespace API.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public Nullable<DateTime> ManufacturingDate { get; set; }
        public Nullable<DateTime> ExpiryDay { get; set; }
        public int GuaranteePeriod { get; set; }
        public string Tag { get; set; }
        public string Location { get; set; }
        public string PhotoUrl { get; set; }

    }
}