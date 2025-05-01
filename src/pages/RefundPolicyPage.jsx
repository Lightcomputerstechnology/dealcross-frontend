// File: src/pages/RefundPolicy.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund Policy - Dealcross</title>
        <meta name="description" content="Understand our policy regarding refunds and cancellations on Dealcross." />
        <meta name="keywords" content="refund, cancellation, policy, dealcross" />
        <meta name="author" content="Dealcross Team" />
        <meta property="og:title" content="Dealcross Refund Policy" />
        <meta property="og:description" content="Understand how refunds are handled on the Dealcross platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dealcross.com/refund-policy" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Dealcross Refund Policy" />
        <meta name="twitter:description" content="Understand how refunds are processed on the Dealcross platform." />
      </Helmet>

      <main className="min-h-screen px-6 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold mb-4 text-center">Refund Policy</h1>

          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Refund Eligibility</h2>
            <p>
              Refunds are issued only under specific conditions. These include canceled transactions,
              resolution decisions in your favor, or technical payment failures. Refunds are only possible
              before funds are released. Once a receiver confirms delivery and clicks “Received,” the
              transaction is finalized and non-refundable, unless fraud is proven.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. Dispute Required</h2>
            <p>
              To request a refund, users must open a dispute within the transaction window. The
              support team will review the case before approving any refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">3. Refund Process & Time</h2>
            <p>
              Funds are released immediately upon confirmation by the buyer. In the event of a dispute
              or failed transaction, and if a refund is approved, the refund will be processed within
              <strong> 0 to 10 business days</strong> depending on your payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Non-Refundable Transactions</h2>
            <p>
              Once funds have been released to a seller or marked as completed, the transaction
              becomes non-refundable unless fraud is proven. Platform service fees or third-party
              payment gateway charges may also be non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Contact Support</h2>
            <p>
              For refund inquiries, contact our support team through your dashboard or email
              <a href="mailto:support@dealcross.com" className="text-blue-600 underline"> support@dealcross.com</a>.
            </p>
          </section>

          <p className="text-sm text-gray-400 mt-10">Last updated: April 22, 2025</p>
        </div>
      </main>
    </>
  );
                }
