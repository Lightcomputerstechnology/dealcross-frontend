// File: src/components/DocsViewer.jsx

import React from 'react';

const DocsViewer = ({ filePath }) => {
  return (
    <div className="w-full h-[600px] overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 shadow">
      <object
        data={filePath}
        type="application/pdf"
        width="100%"
        height="100%"
        className="rounded"
      >
        <p className="text-center text-gray-500 dark:text-gray-400 p-4">
          Your browser does not support PDF previews. You can download the file below.
        </p>
      </object>
    </div>
  );
};

export default DocsViewer;