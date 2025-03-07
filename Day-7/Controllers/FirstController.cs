using Microsoft.AspNetCore.Mvc;

namespace MVC.Controllers
{
    public class FirstController : Controller
    {
        public IActionResult Index1()
        {
            return View();
        }

        public IActionResult Index2()
        {
            return View();
        }

        public IActionResult Index3()
        {
            return View();
        }
    }
}
