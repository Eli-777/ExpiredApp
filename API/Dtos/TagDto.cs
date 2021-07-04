using System;

namespace API.Dtos
{
    public class TagDto
    {
        public int Id { get; set; }
        public string TagName { get; set; }
        public DateTime CreateDate { get; set; }
    }
}