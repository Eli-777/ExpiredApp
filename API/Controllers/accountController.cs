using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class accountController : baseController
    {
        [HttpGet]
        public IActionResult getAccount ()
        {
            return Ok("work");
        }
    }
}