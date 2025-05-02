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

      {/* PDF Preview Box */}
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

      {/* No duplicate Open button here */}
    </>
  );
};

export default DocsViewer;