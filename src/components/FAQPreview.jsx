// File: src/components/FAQPreview.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const faqItems = [
  {
    question: 'What is Dealcross?',
    answer: 'Dealcross is a secure escrow platform for global online transactions.',
  },
  {
    question: 'How does escrow work?',
    answer: 'The buyer funds the deal, the seller delivers, and funds are released upon confirmation.',
  },
  {
    question: 'Can I trade shares here?',
    answer: 'Yes, Dealcross allows you to buy and sell digital shares securely.',
  },
  {
    question: 'Is my money safe?',
    answer: 'Yes, funds are held in escrow until all parties are satisfied.',
  },
];

export default function FAQPreview() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-12 px-6 animate-fade-in">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid gap-6 text-left">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">{item.question}</h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">{item.answer}</p>
            </div>
          ))}
        </div>
        <Link
          to="/faq"
          className="inline-block mt-6 text-blue-600 hover:underline dark:text-blue-400"
        >
          View All FAQs →
        </Link>
      </div>
    </section>
  );
}