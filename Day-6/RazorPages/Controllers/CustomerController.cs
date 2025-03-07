using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Data;
using WebApplication2.Models;

namespace WebApplication2.Controllers
{
    public class CustomerController : Controller
    {
        private readonly CustomerDbContext _context;

        public CustomerController(CustomerDbContext context)
        {
            _context = context;
        }

        // Index: Display all customers
        public async Task<IActionResult> Index()
        {
            var customers = await _context.Customers.ToListAsync();
            return View(customers);
        }

        // Create: Show form to create a new customer
        public IActionResult Create()
        {
            return View();
        }

        // Create (POST): Save new customer
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("CustomerID,Name,Address,Country,City,Phoneno,DateCreated")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                // If DateCreated is not provided, set it to the current date
                if (customer.DateCreated == default)
                {
                    customer.DateCreated = DateTime.Now;
                }

                _context.Add(customer);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(customer);
        }

        // Edit: Show form to edit an existing customer
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return View(customer);
        }

        // Edit (POST): Save the edited customer
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("CustomerID,Name,Address,Country,City,Phoneno,DateCreated")] Customer customer)
        {
            if (id != customer.CustomerID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(customer);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!_context.Customers.Any(e => e.CustomerID == customer.CustomerID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(customer);
        }

        // Delete: Show confirmation page for deletion
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var customer = await _context.Customers
                .FirstOrDefaultAsync(m => m.CustomerID == id);
            if (customer == null)
            {
                return NotFound();
            }

            return View(customer);
        }

        // Delete (POST): Delete the customer from the database
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
}
