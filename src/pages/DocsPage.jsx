// File: src/pages/DocsPage.jsx

import React from 'react';
import { Helmet } from 'react-helmet';
import { FiDownloadCloud } from 'react-icons/fi';
import DocsViewer from '@/components/DocsViewer';

const DocsPage = () => {
  return (
    <>
      <Helmet>
        <title>Dealcross Documentation</title>
        <meta
          name="description"
          content="Official documentation, pitch decks, and platform guides for Dealcross investors and users."
        />
        <meta name="keywords" content="dealcross, docs, pitchdeck, business, overview, pdf, documentation" />
        <meta name="author" content="Dealcross Team" />
        <meta property="og:title" content="Dealcross Documentation" />
        <meta property="og:description" content="View or download Dealcross pitch decks and documents." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dealcross.com/docs" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Dealcross Documentation" />
        <meta name="twitter:description" content="Review pitch decks and business materials from Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center mb-6">Dealcross Documentation</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Review our official documents, pitch materials, and platform guide.
          </p>

          {/* PDF Viewer Component */}
          <DocsViewer filePath="/docs/pitchdeck.pdf" />

          {/* Download Button */}
          <div className="text-center mt-8">
            <a
              href="/docs/pitchdeck.pdf"
              download
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow transition"
            >
              <FiDownloadCloud /> Download Docs PDF
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocsPage;