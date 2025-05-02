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
        <meta name="description" content="Official pitch deck and documents for Dealcross investors and users." />
      </Helmet>

      <div className="min-h-screen px-4 py-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold mb-3">Dealcross Documentation</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Official pitch deck and downloadable materials for partners and investors.
            </p>
          </div>

          {/* Viewer */}
          <DocsViewer filePath="/docs/dealcross_pitchdeck_with_email_final.pdf" />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
            <a
              href="/docs/dealcross_pitchdeck_with_email_final.pdf"
              download
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded flex items-center gap-2 shadow transition"
            >
              <FiDownloadCloud /> Download PDF
            </a>

            <a
              href="/docs/dealcross_pitchdeck_with_email.pptx"
              download
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded flex items-center gap-2 shadow transition"
            >
              <FiDownloadCloud /> Download PowerPoint
            </a>
          </div>

          <p className="text-center text-sm text-gray-400 mt-6">
            Need help? Contact: <a href="mailto:dealcrossgeneralmail@gmail.com" className="text-blue-500 underline">dealcrossgeneralmail@gmail.com</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default DocsPage;