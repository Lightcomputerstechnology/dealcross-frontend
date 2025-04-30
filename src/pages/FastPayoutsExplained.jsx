// File: src/pages/FastPayoutsExplained.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

export default function FastPayoutsExplained() {
  return (
    <>
      <Helmet>
        <title>Fast Payouts - Dealcross</title>
        <meta
          name="description"
          content="Learn how Dealcross ensures fast payouts through bank, card, and crypto channels."
        />
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-lg shadow">
        <h1 className="text-3xl font-extrabold mb-6">Fast Payouts on Dealcross</h1>

        <p className="mb-4 text-lg">
          Receive your earnings fast once a deal is successfully completed. Dealcross supports:
        </p>

        <ul className="list-disc pl-6 space-y-3 text-base">
          <li>
            <strong>Bank/Card payouts:</strong> Naira, USD, and international transfers processed quickly
          </li>
          <li>
            <strong>Instant USDT transfers:</strong> Crypto payouts are handled instantly to your wallet
          </li>
        </ul>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Our system automates payout requests as soon as funds are released.
        </p>
      </main>
    </>
  );
}