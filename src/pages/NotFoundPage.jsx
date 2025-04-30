// File: src/pages/NotFoundPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Dealcross</title>
        <meta name="description" content="The page you are looking for does not exist on Dealcross." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-lg md:text-xl mb-6">Oops! The page you are looking for doesn’t exist.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
        >
          Go back home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
