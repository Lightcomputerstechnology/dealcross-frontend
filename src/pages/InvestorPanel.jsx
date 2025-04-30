// File: src/pages/InvestorPanel.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

const InvestorPanel = () => {
  return (
    <>
      <Helmet>
        <title>Investor Panel - Dealcross</title>
        <meta
          name="description"
          content="Access investment tools, portfolio insights, and exclusive Dealcross opportunities from the investor panel."
        />
        <meta property="og:title" content="Investor Panel | Dealcross" />
        <meta property="og:description" content="Explore your investment performance and tools tailored for Dealcross investors." />
        <meta name="twitter:title" content="Investor Panel - Dealcross" />
        <meta name="twitter:description" content="Manage your investments securely with the Dealcross investor panel." />
      </Helmet>

      <div className="min-h-screen p-6 text-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
        <h1 className="text-3xl font-bold mb-4">Investor Panel</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Welcome to the Investor Panel. Here you'll find investment opportunities, performance metrics,
          and personalized tools to manage your portfolio.
        </p>
      </div>
    </>
  );
};

export default InvestorPanel;