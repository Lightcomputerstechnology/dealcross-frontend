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
        <meta name="description" content="Official pitch deck and platform materials for Dealcross investors and partners." />
        <meta name="keywords" content="dealcross, documentation, investor, deck, overview, fintech" />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-extrabold text-center mb-6">Dealcross Documentation</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Review our official documents, pitch materials, and platform guide.
          </p>

          {/* PDF Viewer */}
          <DocsViewer filePath="/docs/dealcross_pitchdeck_with_email_final.pdf" />

          {/* Download Buttons */}
          <div className="text-center mt-8 space-y-4">
            <a
              href="/docs/dealcross_pitchdeck_with_email_final.pdf"
              download
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow transition"
            >
              <FiDownloadCloud /> Download PDF
            </a>
            <br />
            <a
              href="/docs/dealcross_pitchdeck_with_email.pptx"
              download
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium shadow transition"
            >
              <FiDownloadCloud /> Download PPTX
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocsPage;