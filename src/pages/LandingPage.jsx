// File: src/pages/LandingPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Dealcross - Home</title>
      </Helmet>
      <div className="text-center p-10">
        <h1 className="text-4xl font-bold">Welcome to Dealcross</h1>
        <p className="text-lg mt-2 text-gray-500 dark:text-gray-400">
          Your trusted escrow and trading platform
        </p>
      </div>
    </>
  );
};

export default LandingPage;
