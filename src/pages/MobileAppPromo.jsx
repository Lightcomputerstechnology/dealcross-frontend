// File: src/pages/MobileAppPromo.jsx

import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import phoneMockup from '@/assets/phone-mockup.png'; // Replace with your real mockup

const MobileAppPromo = () => {
  return (
    <>
      <Helmet>
        <title>Get Dealcross Mobile App</title>
        <meta
          name="description"
          content="Download the Dealcross mobile app for secure escrow deals, trading, and wallet management on the go."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white flex flex-col lg:flex-row items-center justify-center px-6 py-12 gap-12">
        {/* Left Content */}
        <div className="max-w-lg text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Take Dealcross with You Anywhere
          </h1>
          <p className="mb-6 text-lg">
            Access escrow deals, trading insights, and manage your wallet seamlessly from your mobile device. Stay in control, wherever you go.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <a
              href="#"
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
            >
              Download for Android
            </a>
            <a
              href="#"
              className="bg-white text-blue-600 font-semibold py-2 px-4 rounded hover:bg-gray-200 transition"
            >
              Download for iOS
            </a>
          </div>
        </div>

        {/* Right Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <img
            src={phoneMockup}
            alt="Dealcross Mobile App"
            className="w-64 sm:w-80 md:w-96 rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </>
  );
};

export default MobileAppPromo;