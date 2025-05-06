// File: src/pages/AboutPage.jsx

import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Dealcross</title>
        <meta
          name="description"
          content="Learn about Dealcross, our mission, team, and services for protecting online transactions."
        />
      </Helmet>

      <section className="min-h-screen px-4 py-16 bg-white dark:bg-gray-950 text-gray-900 dark:text-white animate-fade-in">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About Dealcross
          </motion.h1>

          {/* Summary */}
          <motion.p
            className="text-lg text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Dealcross is a global financial platform ensuring safe, transparent, and trustworthy transactions between individuals and businesses through our modern escrow system.
          </motion.p>

          {/* Our Mission */}
          <motion.div
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300">
              To protect users from online fraud while making digital payments and share trading seamless and accessible to everyone.
            </p>
          </motion.div>

          {/* What We Offer */}
          <motion.div
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Escrow-secured transactions</li>
              <li>Multi-currency wallet support (Card, Bank, BTC, USDT)</li>
              <li>Instant share trading (Crypto, Stocks, etc.)</li>
              <li>Investor dashboards and pitch deck viewers</li>
              <li>AI-powered fraud detection and audit logging</li>
            </ul>
          </motion.div>

          {/* Our Team */}
          <motion.div
            className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">Our Team</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Dealcross is managed by a team of innovators and engineers passionate about fintech, security, and economic empowerment.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg text-center shadow">
                <p className="font-semibold text-white">David Isaac</p>
                <p className="text-sm text-gray-300">Founder & CEO</p>
              </div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 rounded-lg text-center shadow">
                <p className="font-semibold text-white">Jane Smith</p>
                <p className="text-sm text-gray-300">CTO & Co-Founder</p>
              </div>
            </div>
          </motion.div>

          {/* Call To Action */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="mb-4 text-gray-500 dark:text-gray-400">Ready to secure your transactions?</p>
            <Link
              to="/signup"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-semibold transition"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </section>
    </>
  );
}