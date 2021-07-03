using System;

namespace API.Dtos
{
    public class TagDto
    {
        public int TagId { get; set; }
        public string TagName { get; set; }
        public DateTime CreateDate { get; set; }
    }
}