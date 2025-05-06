// File: src/pages/DealsPage.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getMyDeals } from '@/api';
import { Link } from 'react-router-dom';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await getMyDeals();
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
    <main className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white px-4 py-10">
      <Helmet>
        <title>Deals - Dealcross</title>
        <meta name="description" content="Manage all your escrow deals on Dealcross" />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">Ongoing Deals</h1>
        <p className="mb-6 text-center">Your current escrow transactions and their progress.</p>

        {loading ? (
          <p className="text-center text-yellow-500">Loading deals...</p>
        ) : deals.length === 0 ? (
          <p className="text-center text-gray-500">You don't have any deals yet.</p>
        ) : (
          <ul className="space-y-4">
            {deals.map((deal) => (
              <li key={deal.id} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <h2 className="text-xl font-semibold">{deal.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-300 mb-2">
                  ${deal.amount} • Status:{" "}
                  <span className="font-medium text-blue-500">{deal.status}</span>
                </p>
                <div className="flex gap-4 mt-2">
                  <Link
                    to={`/deal/${deal.id}`}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-1.5 text-sm rounded"
                  >
                    View Deal
                  </Link>
                  <Link
                    to={`/deal-chat/${deal.id}/${deal.counterparty_id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm rounded"
                  >
                    Open Chat
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="text-center mt-10">
          <Link
            to="/share-trading"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded text-sm font-medium"
          >
            Go Trade Shares
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DealsPage;