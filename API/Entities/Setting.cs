namespace API.Entities
{
    public class Setting
    {
        public int id { get; set; }
        public string KnownAs { get; set; }
        public int FromExpiredDay { get; set; } = 50;
        public bool IsDarkMode { get; set; } = false;
        public AppUser AppUser { get; set; }
    }
}