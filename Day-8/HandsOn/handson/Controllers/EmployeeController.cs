using handson.DAL.Repositories; // Corrected namespace
using handson.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace handson.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly EmployeeRepository _repository;

        public EmployeeController(EmployeeRepository repository)
        {
            _repository = repository;
        }

        public IActionResult Index()
        {
            var employees = _repository.GetAll();
            return View(employees);
        }

        public IActionResult Create() => View();

        [HttpPost]
        public IActionResult Create(Employee employee)
        {
            if (ModelState.IsValid)
            {
                _repository.Add(employee);
                return RedirectToAction("Index");
            }
            return View(employee);
        }

        public IActionResult Edit(int id)
        {
            var employee = _repository.GetById(id);
            if (employee == null) return NotFound();
            return View(employee);
        }

        [HttpPost]
        public IActionResult Edit(Employee employee)
        {
            if (ModelState.IsValid)
            {
                _repository.Update(employee);
                return RedirectToAction("Index");
            }
            return View(employee);
        }

        public IActionResult Delete(int id)
        {
            var employee = _repository.GetById(id);
            if (employee == null) return NotFound();
            return View(employee);
        }

        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int id)
        {
            _repository.Delete(id);
            return RedirectToAction("Index");
        }
    }
}
