import React from 'react';
import AuthService from '../services/AuthService';

const Logout = ({ setAuth }) => {
  const handleLogout = () => {
    AuthService.logout();
    setAuth(false);
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
