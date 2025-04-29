// File: src/components/TrustLevels.jsx

import React from 'react';
import { ShieldCheck, Lock, Star } from 'lucide-react';

const trustItems = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
    title: 'Verified Identity',
    description: 'All users complete KYC for transparency and safety.',
  },
  {
    icon: <Lock className="h-8 w-8 text-blue-600" />,
    title: 'Secure Payments',
    description: 'Escrow holds your funds until both parties confirm delivery.',
  },
  {
    icon: <Star className="h-8 w-8 text-blue-600" />,
    title: 'User Ratings',
    description: 'Build your profile with feedback from completed deals.',
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
    title: 'Fraud Detection AI',
    description: 'Intelligent monitoring flags risky behavior in real time.',
  },
];

export default function TrustLevels() {
  return (
    <section className="bg-white dark:bg-gray-900 py-12 animate-fade-in">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-10">
          Trust Levels
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md text-center hover:shadow-lg transition"
              role="region"
              aria-label={item.title}
            >
              <div className="flex items-center justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}