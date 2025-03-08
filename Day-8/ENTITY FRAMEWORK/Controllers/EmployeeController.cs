using Microsoft.AspNetCore.Mvc;
using MVC_EFCore.Context;
using MVC_EFCore.Models;

namespace MVC_EFCore.Controllers
{
    public class EmployeeController : Controller
    {
        //AppDbContext _context = new AppDbContext();
        AppDbContext _context;
        public EmployeeController(AppDbContext context)
        {

            _context = context;
        }


        public IActionResult Index()
        {

            return View(_context.Employees.ToList());
        }
        public IActionResult Details(int id)
        {
            var employee = _context.Employees.FirstOrDefault(x => x.Id == id);
            return View(employee);
        }

        public IActionResult Create()
        {

            return View();
        }
        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            _context.Employees.Add(employee);
            _context.SaveChanges();
            return RedirectToAction("Index");

        }

        public IActionResult Edit(int id)
        {
            var employee = _context.Employees.FirstOrDefault(x => x.Id == id);
            return View(employee);
        }

        [HttpPost]
        public IActionResult Edit(int id, Employee employee)
        {
            var obj = _context.Employees.FirstOrDefault(x => x.Id == id);
            obj.Dept = employee.Dept;
            obj.Salary = employee.Salary;
            _context.SaveChanges();
            return RedirectToAction("Index");

        }
        public IActionResult Delete(int id)
        {
            var employee = _context.Employees.FirstOrDefault(x => x.Id == id);
            return View(employee);
        }

        public IActionResult Deleted(int id, Employee employee)
        {
            var obj = _context.Employees.FirstOrDefault(x => x.Id == id);
            _context.Employees.Remove(obj);
            _context.SaveChanges();
            return RedirectToAction("Index");
        }


    }
}
