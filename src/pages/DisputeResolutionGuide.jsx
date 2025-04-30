// File: src/pages/DisputeResolutionGuide.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

export default function DisputeResolutionGuide() {
  return (
    <>
      <Helmet>
        <title>Dispute Resolution Guide | Dealcross</title>
        <meta
          name="description"
          content="Learn how disputes are handled fairly and securely on the Dealcross platform."
        />
      </Helmet>

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-900 dark:text-white bg-white dark:bg-gray-900 rounded-lg shadow">
        <h1 className="text-3xl font-extrabold mb-6">
          Understanding Dispute Resolution on Dealcross
        </h1>

        <p className="mb-4 text-lg">
          If a problem arises during a transaction, our platform ensures fair and prompt resolution.
        </p>

        <ul className="list-disc pl-6 space-y-3 text-base">
          <li><strong>Upload clear proof</strong> – Provide screenshots, receipts, or delivery details.</li>
          <li><strong>Quick moderation</strong> – Our team responds swiftly to ensure fairness.</li>
          <li><strong>Secure processing</strong> – All actions are logged and encrypted for safety.</li>
        </ul>

        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Dealcross prioritizes transparency and protection for every deal.
        </p>
      </main>
    </>
  );
}