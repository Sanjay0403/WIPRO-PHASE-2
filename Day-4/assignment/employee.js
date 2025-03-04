// models/employee.js

const employees = [];

const getAllEmployees = () => {
    return employees; // Return the employees array
};

const createEmployee = (employee) => {
    employees.push(employee); // Add a new employee to the array
};

module.exports = { getAllEmployees, createEmployee };
