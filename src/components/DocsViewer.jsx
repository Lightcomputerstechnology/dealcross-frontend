// File: src/components/DocsViewer.jsx

import React from 'react';

const DocsViewer = ({ filePath }) => {
  return (
    <div className="w-full h-[600px] rounded-md overflow-hidden border border-gray-300 dark:border-gray-700 shadow-lg">
      {filePath ? (
        <iframe
          src={filePath}
          title="Dealcross PDF Viewer"
          className="w-full h-full animate-fade-in"
          frameBorder="0"
          loading="lazy"
        />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
          No document found.
        </div>
      )}
    </div>
  );
};

export default DocsViewer;