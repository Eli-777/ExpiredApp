using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public ICollection<Item> Items { get; set; }
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public Setting Setting { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}