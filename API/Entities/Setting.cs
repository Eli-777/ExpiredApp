namespace API.Entities
{
    public class Setting
    {
        public int id { get; set; }
        public int FromExpiredDay { get; set; }
        public bool isDarkMode { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}