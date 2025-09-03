// File: src/pages/Unauthorized.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Unauthorized() {
  const location = useLocation();
  const from = location.state?.from ?? '/';

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-4">
      <div className="max-w-lg w-full text-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow p-8 space-y-5">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold">Unauthorized</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          You don’t have permission to view this page. If you think this is a mistake, please contact support or try a different account.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm"
            state={{ from }}
          >
            Login with another account
          </Link>
          <Link
            to="/"
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Contact Support
          </Link>
        </div>

        <div className="text-[12px] text-gray-500 dark:text-gray-400 mt-3">
          Tip: If you’re an admin, ensure your account is marked <code>is_admin = true</code> in <code>public.profiles</code>.
        </div>
      </div>
    </main>
  );
                                                                                                   }
