import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const PitchDeckViewer = () => {
  const pdfUrl = '/docs/pitchdeck.pdf';
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-4 md:px-6 py-10">
      <Helmet>
        <title>Investor Pitch Deck - Dealcross</title>
        <meta name="description" content="View and download the Dealcross investor pitch deck PDF." />
        <meta name="keywords" content="Dealcross, investor pitch deck, PDF, financial documents" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6">Investor Pitch Deck</h2>

        <div className="bg-[#1e293b] p-4 rounded-lg shadow-lg mb-6 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded">
              <svg className="animate-spin h-8 w-8 text-yellow-400" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </div>
          )}
          <iframe
            src={pdfUrl}
            title="Pitch Deck PDF"
            aria-label="Investor Pitch Deck"
            className="w-full h-[70vh] md:h-[80vh] rounded-md"
            onLoad={() => setLoading(false)}
            tabIndex="0"
          />
        </div>

        <div className="text-right">
          <a
            href={pdfUrl}
            download
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-medium inline-block"
            aria-label="Download Pitch Deck"
          >
            Download Pitch Deck
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default PitchDeckViewer;