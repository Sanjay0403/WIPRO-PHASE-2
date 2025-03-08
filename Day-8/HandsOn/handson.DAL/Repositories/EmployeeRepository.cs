using handson.DAL.Data;
using handson.Models;
using System.Collections.Generic;
using System.Linq;

namespace handson.DAL.Repositories
{
    public class EmployeeRepository
    {
        private readonly EmployeeDbContext _context;

        public EmployeeRepository(EmployeeDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Employee> GetAll() => _context.Employees.ToList();
        public Employee GetById(int id) => _context.Employees.Find(id);
        public void Add(Employee emp) { _context.Employees.Add(emp); _context.SaveChanges(); }
        public void Update(Employee emp) { _context.Employees.Update(emp); _context.SaveChanges(); }
        public void Delete(int id)
        {
            var emp = _context.Employees.Find(id);
            if (emp != null)
            {
                _context.Employees.Remove(emp);
                _context.SaveChanges();
            }
        }
    }
}
