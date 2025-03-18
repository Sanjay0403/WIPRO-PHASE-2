// UserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/users', { name })
      .then(response => {
        onUserAdded(response.data);  // Update parent with the new user
        setName('');  // Clear input field after submitting
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
