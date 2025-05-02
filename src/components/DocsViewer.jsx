// File: src/components/DocsViewer.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const DocsViewer = ({ filePath }) => {
  return (
    <>
      <Helmet>
        <title>View Document - Dealcross</title>
        <meta name="description" content="Read Dealcross investor documents securely." />
      </Helmet>

      <div className="w-full h-[600px] border border-gray-300 dark:border-gray-700 rounded shadow bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        {filePath ? (
          <iframe
            src={filePath}
            title="Dealcross Document Viewer"
            className="w-full h-full rounded animate-fade-in"
            frameBorder="0"
            loading="lazy"
          />
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center px-4">
            Your browser does not support PDF previews. You can download the file below.
          </p>
        )}
      </div>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-400">Dealcross_Investor_Pitch_2025.pdf</p>
        <a
          href={filePath}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 mt-2 rounded-lg font-semibold shadow transition"
        >
          Open
        </a>
      </div>
    </>
  );
};

export default DocsViewer;