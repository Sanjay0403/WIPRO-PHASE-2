import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddEmployeeForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [dept, setDept] = useState('');
    const [manager, setManager] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [employees, setEmployees] = useState([]);

    // Fetch all employees from the backend
    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/api/employees');
            setEmployees(response.data); // Update the employees state with the response
        } catch (error) {
            setErrorMessage("Error fetching employees");
            console.error(error);
        }
    };

    // Fetch employees when the component mounts
    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newEmployee = {
            name,
            address,
            dept,
            manager
        };

        try {
            // POST request to add the employee
            const response = await axios.post('/api/employees', newEmployee);
            console.log(response.data); // Log the response from the backend

            // Clear the form fields
            setName('');
            setAddress('');
            setDept('');
            setManager('');

            // Re-fetch the employee list after adding the new employee
            fetchEmployees();
        } catch (error) {
            setErrorMessage("Error adding employee");
            console.error(error);
        }
    };

    return (
        <div>
            <h3>Add Employee</h3>
            {errorMessage && <p>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Address:</label>
                    <input 
                        type="text" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Department:</label>
                    <input 
                        type="text" 
                        value={dept} 
                        onChange={(e) => setDept(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Manager:</label>
                    <input 
                        type="text" 
                        value={manager} 
                        onChange={(e) => setManager(e.target.value)} 
                    />
                </div>
                <button type="submit">Add Employee</button>
            </form>

            <h3>Employee List</h3>
            {employees.length > 0 ? (
                <ul>
                    {employees.map((emp) => (
                        <li key={emp.id}>
                            {emp.id} - {emp.name} ({emp.dept})
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No employees found.</p>
            )}
        </div>
    );
};

export default AddEmployeeForm;
