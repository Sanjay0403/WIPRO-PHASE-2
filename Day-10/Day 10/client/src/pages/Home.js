import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Login from '../components/Login';
import Logout from '../components/Logout';

const Home = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <h1>Welcome to Batch Management</h1>
      {isAuthenticated ? (
        <Logout setAuth={setIsAuthenticated} />
      ) : (
        <Login setAuth={setIsAuthenticated} />
      )}
    </div>
  );
};

export default Home;
