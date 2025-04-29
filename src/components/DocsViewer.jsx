// File: src/components/DocsViewer.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

const DocsViewer = ({ filePath }) => {
  return (
    <>
      <Helmet>
        <title>View Document - Dealcross</title>
        <meta
          name="description"
          content="Read the official Dealcross document including pitch decks and business overviews."
        />
        <meta name="keywords" content="dealcross, docs, pitchdeck, viewer, investment" />
        <meta name="author" content="Dealcross Team" />
      </Helmet>

      <div className="w-full h-[600px] border border-gray-300 dark:border-gray-700 rounded shadow">
        {filePath ? (
          <iframe
            src={filePath}
            title="Dealcross Document Viewer"
            className="w-full h-full rounded animate-fade-in"
            frameBorder="0"
            loading="lazy"
          />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
            No document path provided.
          </div>
        )}
      </div>
    </>
  );
};

export default DocsViewer;