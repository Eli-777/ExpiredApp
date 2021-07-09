using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<Item> Items { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public Setting Setting { get; set; } = new Setting {};
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Tag> Tags { get; set; }
        public ICollection<Location> Locations { get; set; }
    }
}