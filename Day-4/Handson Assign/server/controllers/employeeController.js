const employees = require('../models/employee');

// Get all employees
exports.getAllEmployees = (req, res) => {
    res.json(employees);
};

// Get an employee by ID
exports.getEmployeeById = (req, res) => {
    const { id } = req.params;
    const employee = employees.find(emp => emp.id === parseInt(id));
    if (employee) {
        res.json(employee);
    } else {
        res.status(404).send('Employee not found');
    }
};

// Create a new employee
exports.createEmployee = (req, res) => {
    const { name, address, dept, manager } = req.body;

    if (!name || !address || !dept || !manager) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const newEmployee = {
        id: employees.length + 1,  // Unique ID based on the length of the array
        name,
        address,
        dept,
        manager
    };

    employees.push(newEmployee);
    res.status(201).json(newEmployee);
};

// Update an existing employee
exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    const { name, address, dept, manager } = req.body;

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

// Delete an employee
exports.deleteEmployee = (req, res) => {
    const { id } = req.params;
    const index = employees.findIndex(emp => emp.id === parseInt(id));
    if (index !== -1) {
        employees.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Employee not found');
    }
};
