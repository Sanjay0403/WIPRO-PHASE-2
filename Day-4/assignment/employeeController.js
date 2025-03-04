const { getAllEmployees, createEmployee } = require('../models/employee');

exports.getAllEmployees = (req, res) => {
    const employees = getAllEmployees(); // Fetch all employees from the model
    res.json(employees);
};

exports.getEmployeeById = (req, res) => {
    const { id } = req.params;
    const employees = getAllEmployees(); // Fetch all employees from the model
    const employee = employees.find(emp => emp.id === parseInt(id));
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).send('Employee not found');
    }
};

exports.createEmployee = (req, res) => {
    const { name, address, dept, manager } = req.body;
    const newEmployee = {
        id: Date.now(), // Use a unique ID (you can use any logic for this)
        name,
        address,
        dept,
        manager
    };
    createEmployee(newEmployee); // Add new employee via the model
    res.status(201).json(newEmployee);
};

exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, address, dept, manager } = req.body;

    const employees = getAllEmployees(); // Fetch all employees from the model
    const employee = employees.find(emp => emp.id === parseInt(id));
    if (employee) {
        employee.name = name || employee.name;
        employee.address = address || employee.address;
        employee.dept = dept || employee.dept;
        employee.manager = manager || employee.manager;
        res.json(employee);
    } else {
        res.status(404).send('Employee not found');
    }
};

exports.deleteEmployee = (req, res) => {
    const { id } = req.params;
    const employees = getAllEmployees(); // Fetch all employees from the model
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    if (index !== -1) {
        employees.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Employee not found');
    }
};
