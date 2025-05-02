// File: src/pages/DocsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import DocsViewer from '@/components/DocsViewer';
import { FiDownloadCloud } from 'react-icons/fi';

export default function DocsPage() {
  return (
    <>
      <Helmet>
        <title>Documentation - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-4 py-10">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <h1 className="text-3xl font-extrabold">Dealcross Documentation</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Review our official investor pitch deck and product overview.
          </p>
        </div>

        <div className="mt-10">
          <DocsViewer filePath="/docs/Dealcross_Investor_Pitch_2025.pdf" />
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          <a
            href="/docs/Dealcross_Investor_Pitch_2025.pdf"
            download
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded flex items-center gap-2 shadow"
          >
            <FiDownloadCloud /> Download PDF
          </a>

          <a
            href="/docs/dealcross_pitchdeck_with_email.pptx"
            download
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded flex items-center gap-2 shadow"
          >
            <FiDownloadCloud /> Download PowerPoint
          </a>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Need help? Contact: <a href="mailto:dealcrossgeneralmail@gmail.com" className="text-blue-400 underline">dealcrossgeneralmail@gmail.com</a>
        </p>
      </div>
    </>
  );
}