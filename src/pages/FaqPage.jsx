// File: src/pages/FaqPage.jsx

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

const faqList = [
  {
    question: "What is Dealcross?",
    answer:
      "Dealcross is a secure online escrow platform that ensures safe transactions between buyers and sellers. We hold the buyer's payment until both parties are satisfied with the transaction.",
  },
  {
    question: "How do I start a deal on Dealcross?",
    answer:
      "To start a deal, log in, go to 'Start Deal', fill in the transaction details, invite the counterparty, and fund the deal using your wallet.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "You can fund your wallet using debit/credit cards, bank transfers, and crypto (USDT, BTC).",
  },
  {
    question: "Is there a fee to use Dealcross?",
    answer:
      "A small service fee is deducted from each successful transaction to maintain platform security and operations.",
  },
  {
    question: "What happens if there is a dispute?",
    answer:
      "If there's a disagreement, either party can raise a dispute. Our resolution team will review evidence and resolve the matter fairly.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <>
      <Helmet>
        <title>FAQs - Dealcross</title>
        <meta name="description" content="Answers to frequently asked questions about using the Dealcross escrow platform." />
      </Helmet>

      <main className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center mb-10">Frequently Asked Questions</h1>

          <div className="space-y-4">
            {faqList.map((faq, index) => (
              <div key={index} className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={openIndex === index}
                  className="w-full text-left px-6 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition font-medium"
                >
                  {faq.question}
                </button>
                <div
                  className={`px-6 py-4 bg-white dark:bg-gray-950 border-t border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'block' : 'hidden'
                  }`}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}