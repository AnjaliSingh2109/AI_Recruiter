import React from 'react';
import Sidebar from '../components/Sidebar';
import AppNavbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';


const Layout: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
      <div className="d-flex flex-grow-1 overflow-hidden">
        <Sidebar />
        <div className="flex-grow-1 p-4 bg-light overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
