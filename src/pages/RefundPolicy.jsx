// File: src/pages/RefundPolicy.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund Policy - Dealcross</title>
        <meta name="description" content="Understand our policy regarding refunds and cancellations on Dealcross." />
        <meta name="author" content="Dealcross Team" />
        <meta property="og:title" content="Dealcross Refund Policy" />
        <meta property="og:description" content="Read the refund policy and cancellation rules for Dealcross users." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dealcross.com/refund-policy" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Refund Policy - Dealcross" />
        <meta name="twitter:description" content="Understand how Dealcross processes refund requests and cancellations." />
      </Helmet>

      <main className="min-h-screen px-4 sm:px-6 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-white animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400">Refund Policy</h1>

          {[
            {
              title: '1. Refund Eligibility',
              content:
                'Refunds are only granted for canceled deals or technical issues before funds are released.',
            },
            {
              title: '2. Dispute Required',
              content:
                'Users must file a dispute during the transaction window. All refunds go through case review.',
            },
            {
              title: '3. Refund Process & Time',
              content:
                'Refunds, once approved, are processed within 0–10 business days depending on the payment provider.',
            },
            {
              title: '4. Non-Refundable Transactions',
              content:
                'Completed transactions and released funds are non-refundable unless fraud is proven.',
            },
            {
              title: '5. Contact Support',
              content: (
                <>
                  For help, contact our team via your dashboard or email:{' '}
                  <a href="mailto:support@dealcross.net" className="text-blue-600 underline">
                    support@dealcross.net
                  </a>
                </>
              ),
            },
          ].map((section, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{section.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
            </div>
          ))}

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-10">
            Last updated: April 22, 2025
          </p>
        </div>

        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.6s ease-in-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </main>
    </>
  );
}