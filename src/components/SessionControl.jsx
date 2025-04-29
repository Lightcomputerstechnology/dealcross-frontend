// File: src/pages/SessionControl.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SessionControl = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    toast.success('You have been logged out.');
    navigate('/login');
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen flex flex-col items-center justify-center px-6 py-16 animate-fade-in">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Session Control</h2>
      <p className="mb-6 text-gray-600 dark:text-gray-400 text-center max-w-md">
        You’re logged in. Use the button below to securely end your session.
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-700 transition px-6 py-2 rounded-lg font-semibold text-white shadow"
      >
        Logout
      </button>
    </div>
  );
};

export default SessionControl;