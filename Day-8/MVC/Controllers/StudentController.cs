using Microsoft.AspNetCore.Mvc;
using MVC_DemoDay8.Models;
using System.Collections.Generic;
using System.Linq;

namespace MVC_DemoDay8.Controllers
{
    public class StudentController : Controller
    {
        static List<Student> students = null;

        public StudentController()
        {
            if (students == null)
            {
                students = new List<Student>()
                {
                    new Student() { Id = 1, Name = "ajay", Batch = "B001", Marks = 90 },
                    new Student() { Id = 2, Name = "jay", Batch = "B002", Marks = 90 },
                    new Student() { Id = 3, Name = "vijay", Batch = "B002", Marks = 90 },
                    new Student() { Id = 4, Name = "deepak", Batch = "B003", Marks = 90 }
                };
            }
        }

        public IActionResult Index()
        {
            return View(students);
        }

        public IActionResult Details(int id)
        {
            var student = students.FirstOrDefault(x => x.Id == id);
            return View(student);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Student student)
        {
            students.Add(student);
            return RedirectToAction("Index");
        }

        public IActionResult Edit(int id)
        {
            var student = students.FirstOrDefault(x => x.Id == id);
            return View(student);
        }

        [HttpPost]
        public IActionResult Edit(int id, Student student)
        {
            var obj = students.FirstOrDefault(x => x.Id == id);
            if (obj != null)
            {
                obj.Batch = student.Batch;
                obj.Marks = student.Marks;
            }
            return RedirectToAction("Index");
        }

        public IActionResult Delete(int id)
        {
            var student = students.FirstOrDefault(x => x.Id == id);
            return View(student);
        }

        [HttpPost]
        public IActionResult DeleteConfirmed(int id)
        {
            var obj = students.FirstOrDefault(x => x.Id == id);
            if (obj != null)
            {
                students.Remove(obj);
            }
            return RedirectToAction("Index");
        }
    }
}
