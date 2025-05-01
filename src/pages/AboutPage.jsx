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

      <section className="max-w-4xl mx-auto px-4 py-16 text-gray-900 dark:text-white">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About Dealcross
        </motion.h1>

        <motion.p
          className="text-lg text-center text-gray-600 dark:text-gray-400 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Dealcross is a global financial platform ensuring safe, transparent, and trustworthy
          transactions between individuals and businesses through our modern escrow system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
          <p>
            To protect users from online fraud while making digital payments and share trading
            seamless and accessible to everyone.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Escrow-secured transactions</li>
            <li>Multi-currency wallet support (Card, Bank, BTC, USDT)</li>
            <li>Instant share trading (Crypto, Stocks, etc.)</li>
            <li>Investor dashboards and pitch deck viewers</li>
            <li>AI-powered fraud detection and audit logging</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold mb-2">Our Team</h2>
          <p>
            Dealcross is managed by a team of innovators and engineers passionate about fintech,
            security, and economic empowerment.
          </p>
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="font-semibold">David Isaac</p>
              <p className="text-sm text-gray-400">Founder & CEO</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg text-center">
              <p className="font-semibold">Jane Smith</p>
              <p className="text-sm text-gray-400">CTO & Co-Founder</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="mb-4 text-gray-500 dark:text-gray-400">Ready to secure your transactions?</p>
          <Link
            to="/signup"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
          >
            Get Started
          </Link>
        </motion.div>
      </section>
    </>
  );
}