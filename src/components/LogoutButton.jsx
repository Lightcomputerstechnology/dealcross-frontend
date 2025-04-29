// File: src/components/LogoutButton.jsx

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LogoutButton = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setShowConfirm(true)}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
        aria-haspopup="dialog"
        aria-expanded={showConfirm}
      >
        Logout
      </button>

      {showConfirm && (
        <div
          className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 animate-fade-in"
          role="alertdialog"
          aria-label="Logout confirmation"
        >
          <div className="p-4 text-gray-700 dark:text-gray-200 text-sm">
            Are you sure you want to log out?
          </div>
          <div className="flex justify-end space-x-2 p-2">
            <button
              onClick={() => setShowConfirm(false)}
              className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;