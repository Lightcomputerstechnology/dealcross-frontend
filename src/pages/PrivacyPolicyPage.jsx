// File: src/pages/PrivacyPolicyPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Dealcross</title>
        <meta name="description" content="Read the Dealcross privacy policy explaining how we collect, use, and protect your personal data." />
      </Helmet>

      <main className="min-h-screen px-6 py-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p>
            At Dealcross, your privacy is important to us. This Privacy Policy outlines how we collect,
            use, and protect your personal data when using our platform.
          </p>

          <div className="text-left space-y-6">
            <section>
              <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
              <p>We collect personal info such as your name, email, and payment details during registration or transactions.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-6">2. How We Use Your Data</h2>
              <p>We use your data to process transactions, provide support, and comply with regulations.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-6">3. Data Security</h2>
              <p>We implement strong security measures to protect your information from unauthorized access.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-6">4. Your Rights</h2>
              <p>You have the right to access, update, or delete your data. Contact us for privacy concerns.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-6">5. Data Sharing</h2>
              <p>We never sell your data. We only share with trusted providers or as required by law.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mt-6">6. Updates to This Policy</h2>
              <p>We may update this policy and post changes here. Please check back for updates.</p>
            </section>

            <p className="text-sm text-gray-400 mt-10 text-center">Effective Date: April 22, 2025</p>
          </div>
        </div>
      </main>
    </>
  );
}