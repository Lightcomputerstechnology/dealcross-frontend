import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockKey } from 'lucide-react';

const Unauthorized = () => {
  const [seconds, setSeconds] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds === 0) {
      navigate('/');
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4 text-center">
      <div className="bg-red-100 dark:bg-red-900 p-6 rounded-2xl shadow-md max-w-md w-full">
        <div className="flex items-center justify-center mb-4">
          <LockKeyhole className="h-10 w-10 text-red-600 dark:text-red-300" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Access Denied
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          You don’t have permission to view this page.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Redirecting to homepage in <span className="font-medium">{seconds}</span> seconds...
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Go Home Now
        </Link>
        <p className="mt-4 text-xs text-gray-400 dark:text-gray-500">
          Need help? Contact support or an admin.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;