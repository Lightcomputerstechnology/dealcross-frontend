// src/pages/ShareTradingTips.jsx
import React from 'react';

export default function ShareTradingTips() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Tips for First-Time Share Traders on Dealcross</h1>
      <p className="mb-4">Start trading digital shares securely with these 3 tips:</p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>Verify your investor profile</li>
        <li>Review share risk levels</li>
        <li>Use escrow to protect your funds</li>
      </ol>
    </main>
  );
}