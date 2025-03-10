﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MVC_EFCore.Controllers
{
    public class Employee1Controller : Controller
    {
        // GET: Employee1Controller
        public ActionResult Index()
        {
            return View();
        }

        // GET: Employee1Controller/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Employee1Controller/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Employee1Controller/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Employee1Controller/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Employee1Controller/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Employee1Controller/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Employee1Controller/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
