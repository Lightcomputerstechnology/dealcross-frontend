// File: src/pages/DocsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';
import { FiDownloadCloud } from 'react-icons/fi';
import DocsViewer from '@/components/DocsViewer';
import Logo from '@/assets/images/dealcross-logo.png';

export default function DocsPage() {
  return (
    <>
      <Helmet>
        <title>Dealcross Documentation</title>
        <meta name="description" content="Official pitch decks and platform guides for Dealcross investors and users." />
      </Helmet>

      <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-10">
        {/* Watermark */}
        <img
          src={Logo}
          alt="Dealcross Logo"
          className="absolute inset-0 opacity-5 w-full h-full object-contain pointer-events-none z-0"
        />

        <div className="relative z-10 max-w-5xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">Dealcross Documentation</h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and download official Dealcross pitch decks and platform guides.
            </p>
          </div>

          {/* Viewer */}
          <DocsViewer filePath="/docs/pitchdeck.pdf" />

          {/* Download Buttons */}
          <div className="text-center space-y-4 animate-fade-in">
            <a
              href="/docs/pitchdeck.pdf"
              download="Dealcross_Investor_Pitch_2025.pdf"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
            >
              <FiDownloadCloud /> Download PDF
            </a>

            <br />

            <a
              href="/docs/pitchdeck.pptx"
              download="Dealcross_PitchDeck.pptx"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium shadow-md transition"
            >
              <FiDownloadCloud /> Download PowerPoint
            </a>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Need help? Contact: <span className="underline text-blue-500">dealcrossgeneralmail@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Style Enhancements */}
        <style>{`
          .animate-fade-in {
            animation: fadeIn 1s ease-in-out;
          }
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </>
  );
}