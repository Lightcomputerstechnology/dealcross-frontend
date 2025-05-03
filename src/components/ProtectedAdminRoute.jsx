import React from 'react';
import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '@/api'; // Assumes alias '@' is configured

const ProtectedAdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const user = await API.getCurrentUser();
        if (user.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error('Admin check failed:', err.message);
      } finally {
        setLoading(false);
      }
    };
    checkAdminStatus();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-600 dark:text-gray-300 text-lg">Checking admin access...</span>
      </div>
    );
  }

  return isAdmin ? children : <Navigate to="/unauthorized" />;
};

export default ProtectedAdminRoute;