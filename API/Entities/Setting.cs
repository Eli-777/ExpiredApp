namespace API.Entities
{
    public class Setting
    {
        public int SettingId { get; set; }
        public int FromExpiredDay { get; set; } = 50;
        public bool IsDarkMode { get; set; } = false;
    }
}