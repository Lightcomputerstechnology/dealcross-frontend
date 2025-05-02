// File: src/pages/DocsPage.jsx

import React from 'react';
import { Helmet } from 'react-helmet';
import DocsViewer from '@/components/DocsViewer';
import { FiDownloadCloud } from 'react-icons/fi';

const DocsPage = () => {
  return (
    <>
      <Helmet>
        <title>Dealcross Documentation</title>
        <meta name="description" content="View our official pitch deck and platform documentation." />
      </Helmet>

      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Dealcross Documentation</h1>
            <p className="text-gray-600 dark:text-gray-400">
              View or download our investor pitch materials and business overview.
            </p>
          </div>

          {/* PDF Viewer */}
          <DocsViewer filePath="/docs/dealcross_pitchdeck_with_email_final.pdf" />

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/docs/dealcross_pitchdeck_with_email_final.pdf"
              download
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition"
            >
              <FiDownloadCloud /> Download PDF
            </a>
            <a
              href="/docs/dealcross_pitchdeck_with_email.pptx"
              download
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2 transition"
            >
              <FiDownloadCloud /> Download PowerPoint
            </a>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-6">
            Need help? Contact: <a href="mailto:dealcrossgeneralmail@gmail.com" className="text-blue-500 underline">dealcrossgeneralmail@gmail.com</a>
          </p>
        </div>
      </main>
    </>
  );
};

export default DocsPage;