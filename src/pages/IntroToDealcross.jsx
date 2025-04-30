// File: src/pages/IntroToDealcross.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

export default function IntroToDealcross() {
  return (
    <>
      <Helmet>
        <title>What Is Dealcross?</title>
        <meta
          name="description"
          content="Learn how Dealcross protects your online transactions using secure escrow, dispute resolution, and trust-based payment release."
        />
        <meta property="og:title" content="Why Dealcross Is Changing Online Transactions" />
        <meta property="og:description" content="Discover why users trust Dealcross to protect their money during transactions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dealcross.com/intro" />
        <meta name="twitter:title" content="Why Dealcross Is Different" />
        <meta name="twitter:description" content="Escrow, trust, and security built into every transaction." />
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-lg shadow">
        <h1 className="text-3xl font-extrabold mb-6">Why Dealcross Is Changing Online Transactions</h1>

        <p className="mb-6 text-lg">
          Dealcross uses an escrow system to protect both buyers and sellers. Your payment is securely held
          until the seller delivers the agreed product or service — reducing fraud and increasing trust.
        </p>

        <h2 className="text-2xl font-semibold mb-3">Why it matters:</h2>
        <ul className="list-disc pl-6 space-y-2 text-base">
          <li><strong>Safer for buyers:</strong> Payment is only released after confirmed delivery.</li>
          <li><strong>Trusted by sellers:</strong> Sellers get guaranteed payment after fulfilling deals.</li>
          <li><strong>Backed by dispute resolution:</strong> Dealcross steps in if there's a disagreement.</li>
        </ul>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Dealcross is the modern way to trade securely — anywhere, anytime.
        </p>
      </main>
    </>
  );
}