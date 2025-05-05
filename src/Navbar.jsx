// File: src/pages/Unauthorized.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Unauthorized = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 10000); // Auto-redirect after 10 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Unauthorized Access | Dealcross</title>
      </Helmet>

      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-950 px-4">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
            Access Denied
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            You do not have permission to view this page.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all duration-200"
          >
            Go Home Now
          </button>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            You will be redirected in 10 seconds...
          </p>
        </div>
      </div>
    </>
  );
};

export default Unauthorized;