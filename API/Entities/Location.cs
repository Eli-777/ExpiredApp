using System;
using System.Collections.Generic;

namespace API.Entities
{
    public class Location
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.UtcNow;
        public ICollection<Item> Items { get; set; }
    }
}