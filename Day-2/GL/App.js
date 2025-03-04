// App.js
import React, { useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';

const App = () => {
  const [users, setUsers] = useState([]);

  const handleUserAdded = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  return (
    <div>
      <h1>User Management</h1>
      <UserForm onUserAdded={handleUserAdded} />
      <UserList />
    </div>
  );
};

export default App;
