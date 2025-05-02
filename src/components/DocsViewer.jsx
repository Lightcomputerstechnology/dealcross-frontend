// File: src/components/DocsViewer.jsx
import React from 'react';

export default function DocsViewer({ filePath }) {
  return (
    <div className="w-full h-[600px] border border-gray-300 dark:border-gray-700 rounded shadow-md overflow-hidden">
      {filePath ? (
        <iframe
          src={filePath}
          title="Dealcross Document"
          className="w-full h-full"
          frameBorder="0"
        />
      ) : (
        <div className="flex items-center justify-center h-full text-sm text-gray-500 dark:text-gray-400">
          Document viewer failed to load.
        </div>
      )}
    </div>
  );
}