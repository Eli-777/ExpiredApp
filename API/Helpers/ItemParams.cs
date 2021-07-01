namespace API.Helpers
{
  public class ItemParams
  {
    public int FromExpiredDay { get; set; } = -1;
    public bool IsExpired { get; set; } = false;
  }
}