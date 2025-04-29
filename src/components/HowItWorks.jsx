// File: src/components/HowItWorks.jsx

import React from 'react';
import { ClipboardList, ShieldCheck, DollarSign } from 'lucide-react';

const features = [
  {
    icon: <ClipboardList className="w-6 h-6 text-blue-600" aria-hidden="true" />,
    title: 'How It Works',
    description: 'Simple and secure process from start to finish.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-yellow-600" aria-hidden="true" />,
    title: 'Trust Levels',
    description: 'Build your reputation with verified business accounts.',
  },
  {
    icon: <DollarSign className="w-6 h-6 text-green-600" aria-hidden="true" />,
    title: 'Fast Payouts',
    description: 'Receive your funds within 0–6 business days.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">{item.icon}</div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}