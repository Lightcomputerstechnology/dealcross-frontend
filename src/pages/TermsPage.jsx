// File: src/pages/TermsPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Dealcross</title>
        <meta name="description" content="Read the full terms and conditions for using the Dealcross platform." />
        <meta name="keywords" content="terms, conditions, agreement, policy, dealcross" />
        <meta name="author" content="Dealcross Team" />
        <meta property="og:title" content="Dealcross Terms of Service" />
        <meta property="og:description" content="Understand your rights and responsibilities when using the Dealcross platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dealcross.com/terms" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Terms of Service - Dealcross" />
        <meta name="twitter:description" content="Review Dealcross usage terms and platform policies." />
      </Helmet>

      <main className="min-h-screen px-4 sm:px-6 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-white animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400">Terms of Service</h1>

          {[
            {
              title: '1. Acceptance of Terms',
              content:
                'By accessing and using Dealcross, you agree to be bound by these Terms of Service. If you do not agree with any part of the terms, you must not use our platform.',
            },
            {
              title: '2. Account Responsibility',
              content:
                'Users are responsible for maintaining the confidentiality of their account information and are liable for all activities under their account.',
            },
            {
              title: '3. Platform Usage',
              content:
                'You agree not to misuse the platform for any illegal or unauthorized purpose, including fraud or money laundering.',
            },
            {
              title: '4. Payment & Fees',
              content:
                'Dealcross may charge fees for certain transactions. These will be clearly communicated before execution.',
            },
            {
              title: '5. Dispute Resolution',
              content:
                'In case of a dispute between parties, Dealcross offers a built-in resolution process. Our team reserves the right to make final decisions.',
            },
            {
              title: '6. Changes to Terms',
              content:
                'We reserve the right to modify these terms at any time. Continued use of the platform constitutes your acceptance of the new terms.',
            },
            {
              title: '7. Limitation of Liability',
              content:
                'Dealcross is not liable for any indirect, incidental, or consequential damages arising from your use of the platform, including transaction losses, even if advised of the possibility of such damages.',
            },
          ].map((section, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{section.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{section.content}</p>
            </div>
          ))}

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-10">Last updated: April 2025</p>
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