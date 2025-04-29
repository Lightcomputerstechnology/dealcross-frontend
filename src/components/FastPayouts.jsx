// File: src/components/FastPayouts.jsx

import React from 'react';
import { DollarSign, Clock, Zap } from 'lucide-react';

const FastPayouts = () => {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-16 px-4 text-center animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Fast Payouts
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Get your money out quickly and securely. Our system is built for speed and reliability.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          {/* Card 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-400">
              <DollarSign className="w-6 h-6" aria-hidden="true" />
              <h4 className="font-semibold text-lg">Instant Withdrawals</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Withdraw your balance anytime — no waiting days.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-400">
              <Clock className="w-6 h-6" aria-hidden="true" />
              <h4 className="font-semibold text-lg">24/7 Processing</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Transactions are processed around the clock, even on weekends.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3 text-blue-600 dark:text-blue-400">
              <Zap className="w-6 h-6" aria-hidden="true" />
              <h4 className="font-semibold text-lg">Secure Transfers</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Enjoy peace of mind with encrypted and protected payout channels.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FastPayouts;