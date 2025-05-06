// File: src/pages/PrivacyPolicyPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Dealcross</title>
        <meta name="description" content="Read the Dealcross privacy policy explaining how we collect, use, and protect your personal data." />
        <meta name="author" content="Dealcross Team" />
        <meta property="og:title" content="Dealcross Privacy Policy" />
        <meta property="og:description" content="See how Dealcross collects and protects your personal data and your rights as a user." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dealcross.com/privacy-policy" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Privacy Policy - Dealcross" />
        <meta name="twitter:description" content="Understand our commitment to your privacy, security, and data usage rights." />
      </Helmet>

      <main className="min-h-screen px-4 sm:px-6 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-white animate-fade-in">
        <div className="max-w-4xl mx-auto space-y-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-600 dark:text-blue-400">Privacy Policy</h1>
          <p className="text-center text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            At Dealcross, your privacy is important to us. This Privacy Policy outlines how we collect,
            use, and protect your personal data when using our platform.
          </p>

          {[
            {
              title: '1. Information We Collect',
              content:
                'We collect personal info such as your name, email, and payment details during registration or transactions.',
            },
            {
              title: '2. How We Use Your Data',
              content:
                'We use your data to process transactions, provide support, and comply with regulations.',
            },
            {
              title: '3. Data Security',
              content:
                'We implement strong security measures to protect your information from unauthorized access.',
            },
            {
              title: '4. Your Rights',
              content:
                'You have the right to access, update, or delete your data. Contact us for privacy concerns.',
            },
            {
              title: '5. Data Sharing',
              content:
                'We never sell your data. We only share with trusted providers or as required by law.',
            },
            {
              title: '6. Updates to This Policy',
              content:
                'We may update this policy and post changes here. Please check back for updates.',
            },
          ].map((item, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">{item.title}</h2>
              <p className="text-gray-700 dark:text-gray-300">{item.content}</p>
            </div>
          ))}

          <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-10">
            Effective Date: April 22, 2025
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