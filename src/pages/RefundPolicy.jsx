// File: src/pages/RefundPolicy.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund Policy - Dealcross</title>
        <meta name="description" content="Understand our policy regarding refunds and cancellations on Dealcross." />
      </Helmet>

      <main className="min-h-screen px-6 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Refund Policy</h1>

          <div className="text-left space-y-6">
            <section>
              <h2 className="text-2xl font-semibold">1. Refund Eligibility</h2>
              <p>Refunds are only granted for canceled deals or technical issues before funds are released.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">2. Dispute Required</h2>
              <p>Users must file a dispute during the transaction window. All refunds go through case review.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">3. Refund Process & Time</h2>
              <p>Refunds, once approved, are processed within <strong>0–10 business days</strong> depending on the payment provider.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">4. Non-Refundable Transactions</h2>
              <p>Completed transactions and released funds are non-refundable unless fraud is proven.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold">5. Contact Support</h2>
              <p>
                For help, contact our team via your dashboard or email:{" "}
                <a href="mailto:support@dealcross.net" className="text-blue-600 underline">support@dealcross.net</a>
              </p>
            </section>

            <p className="text-sm text-gray-400 mt-10 text-center">Last updated: April 22, 2025</p>
          </div>
        </div>
      </main>
    </>
  );
}
