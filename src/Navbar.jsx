// File: src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md py-4 px-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600 dark:text-white">
          Dealcross
        </Link>
        <div className="space-x-4">
          <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:underline">Login</Link>
          <Link to="/signup" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
