// File: src/components/DocsViewer.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import Logo from '@/assets/images/dealcross-logo.png'; // ✅ Update to your logo path

const DocsViewer = ({ filePath }) => {
  return (
    <>
      <Helmet>
        <title>Dealcross Pitch Deck</title>
        <meta name="description" content="Investor pitch deck and documentation for Dealcross" />
      </Helmet>

      <div className="w-full max-w-6xl mx-auto border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden shadow bg-white dark:bg-gray-950 mb-10">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
          <img src={Logo} alt="Dealcross Logo" className="h-8" />
          <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
            Dealcross_Investor_Pitch_2025.pdf
          </span>
        </div>

        <div className="w-full h-[600px] bg-white dark:bg-gray-900 flex items-center justify-center">
          <iframe
            src={filePath}
            title="Pitch Deck PDF"
            className="w-full h-full"
            frameBorder="0"
          />
        </div>
      </div>
    </>
  );
};

export default DocsViewer;