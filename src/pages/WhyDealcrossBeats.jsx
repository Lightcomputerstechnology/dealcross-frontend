import React from 'react';
import { Helmet } from 'react-helmet';

export default function WhyDealcrossBeats() {
  return (
    <>
      <Helmet>
        <title>Why Choose Dealcross</title>
        <meta name="description" content="Learn why Dealcross outperforms other platforms in escrow protection, wallet flexibility, and digital trading." />
        <meta name="keywords" content="why dealcross, escrow, wallet, crypto, share trading, platform comparison" />
        <meta name="author" content="Dealcross Team" />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12 text-gray-900 dark:text-white">
        <h1 className="text-4xl font-extrabold mb-6 text-center">Why Dealcross Beats Other Platforms</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 text-center">
          Dealcross was built with security, flexibility, and innovation in mind—here’s what makes us stand out:
        </p>

        <div className="bg-white dark:bg-[#1e293b] p-6 rounded-xl shadow space-y-4">
          <ul className="space-y-4 list-disc pl-6">
            <li>
              <strong>Real Escrow Protection:</strong> Funds are securely held until both parties approve the transaction.
            </li>
            <li>
              <strong>Multi-Wallet Support:</strong> Fund and withdraw using your bank, cards, Bitcoin, or USDT—no limits.
            </li>
            <li>
              <strong>Crypto + Share Trading:</strong> Buy and sell tokenized shares alongside digital currencies in one place.
            </li>
            <li>
              <strong>Automated Dispute Tools:</strong> Our built-in resolution center ensures fair conflict handling.
            </li>
            <li>
              <strong>Verified Trust Levels:</strong> Each user has a visible badge to boost credibility and reduce risk.
            </li>
            <li>
              <strong>Lower Fees, Transparent Rates:</strong> No hidden charges—just simple, fair pricing based on your tier.
            </li>
          </ul>
        </div>
      </main>
    </>
  );
}