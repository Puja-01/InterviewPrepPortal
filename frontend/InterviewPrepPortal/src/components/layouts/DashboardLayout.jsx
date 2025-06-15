import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
