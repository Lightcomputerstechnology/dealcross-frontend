// File: src/components/OngoingDeals.jsx

import React, { useEffect, useState } from 'react';
import { getMyDeals } from '@/api';
import LoadingSpinner from './LoadingSpinner';
import EmptyStateMessage from './EmptyStateMessage';

export default function OngoingDeals() {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getMyDeals(); // Backend-connected
        setDeals(data || []);
      } catch (err) {
        console.error('Failed to load deals:', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          Deals in Progress
        </h2>

        {loading ? (
          <LoadingSpinner size={32} fullPage={false} />
        ) : deals.length === 0 ? (
          <EmptyStateMessage message="No ongoing deals found." />
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <div
                key={deal.id}
                className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 shadow animate-fade-in"
              >
                <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                  {deal.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Amount: ${deal.amount}
                </p>
                <span className="inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                  {deal.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}