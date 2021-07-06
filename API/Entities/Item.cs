using System;

namespace API.Entities
{
    public class Item
    {
        public int Id { get; set; }
        public string ItemName { get; set; }
        public Nullable<DateTime> ManufacturingDate { get; set; }
        public Nullable<DateTime> ExpiryDate { get; set; }
        public int GuaranteePeriod { get; set; }
        public Tag Tag { get; set; }
        public Location Location { get; set; }
        public string PhotoUrl { get; set; }
        public string PhotoPublicId { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    }
}