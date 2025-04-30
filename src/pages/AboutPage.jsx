import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Dealcross</title>
        <meta name="description" content="Learn about Dealcross, our mission, team, and services for protecting online transactions." />
      </Helmet>

      <div className="min-h-screen px-6 py-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.h1
            className="text-3xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            About Dealcross
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Dealcross is a global financial platform ensuring safe, transparent, and trustworthy
            transactions between individuals and businesses across borders through our modern escrow system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-xl font-semibold mt-6">Our Mission</h2>
            <p>
              To protect users from online fraud while making digital payments and share trading
              seamless and accessible to everyone.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold mt-6">What We Offer</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Escrow-secured transactions</li>
              <li>Multi-currency wallet support (Card, Bank, BTC, USDT)</li>
              <li>Instant share trading (Crypto, Stocks, etc.)</li>
              <li>Investor dashboards and business pitch decks</li>
              <li>AI-powered fraud detection</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-xl font-semibold mt-6">Our Team</h2>
            <p>
              Dealcross is managed by a team of innovators and engineers passionate about fintech,
              security, and economic empowerment.
            </p>
            {/* Team Cards */}
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

          {/* CTA */}
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <p className="mb-4">Ready to secure your transactions?</p>
            <Link
              to="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold transition"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </div>
    </>
  );
}
