// File: src/pages/DisputeResolutionPage.jsx

import React from 'react';
import { Helmet } from 'react-helmet';

export default function DisputeResolutionPage() {
  return (
    <>
      <Helmet>
        <title>Dispute Resolution - Dealcross</title>
        <meta name="description" content="Learn how Dealcross handles disputes between parties." />
      </Helmet>
      <main className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Dispute Resolution</h1>
          <p className="mb-4 text-gray-300">
            If a disagreement arises between parties in a deal, Dealcross provides a structured way to raise and
            resolve disputes. Our admin team will investigate and make a resolution based on platform policy and
            evidence provided.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Open a dispute within the deal interface.</li>
            <li>Upload screenshots or supporting files.</li>
            <li>Wait for admin investigation (typically within 24–48 hours).</li>
            <li>Both parties will be notified of the resolution.</li>
          </ul>
          <p className="mt-6 text-sm text-gray-500">
            For further inquiries, please contact support@dealcross.net
          </p>
        </div>
      </main>
    </>
  );
}