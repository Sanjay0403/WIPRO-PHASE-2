import React from 'react';
import BatchList from '../components/BatchList';
import Logout from '../components/Logout';

const Dashboard = ({ setAuth }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Logout setAuth={setAuth} />
      <BatchList />
    </div>
  );
};

export default Dashboard;
