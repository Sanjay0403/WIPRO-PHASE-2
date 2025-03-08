using handson.DAL.Repositories;
using handson.Models;
using System.Collections.Generic;

namespace handson.BLL
{
    public class EmployeeService
    {
        private readonly EmployeeRepository _repository;
        public EmployeeService(EmployeeRepository repository) { _repository = repository; }
        public IEnumerable<Employee> GetAllEmployees() => _repository.GetAll();
        public Employee GetEmployeeById(int id) => _repository.GetById(id);
        public void AddEmployee(Employee emp) => _repository.Add(emp);
        public void UpdateEmployee(Employee emp) => _repository.Update(emp);
        public void DeleteEmployee(int id) => _repository.Delete(id);
    }
}
