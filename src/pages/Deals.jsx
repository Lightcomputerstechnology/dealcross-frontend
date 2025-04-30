// File: src/pages/Deals.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getMyDeals } from '@/api';
import { toast } from 'react-hot-toast';
import { FiMessageCircle } from 'react-icons/fi';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDeals = async () => {
    try {
      const data = await getMyDeals();
      setDeals(data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to load deals.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500';
      case 'active':
        return 'text-blue-400';
      case 'completed':
        return 'text-green-500';
      case 'disputed':
        return 'text-red-500';
      case 'cancelled':
        return 'text-gray-400';
      default:
        return 'text-white';
    }
  };

  return (
    <main className="min-h-screen px-4 py-8 bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white">
      <Helmet>
        <title>My Deals - Dealcross</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">My Active Deals</h1>

      {loading ? (
        <p className="text-center text-yellow-400">Loading deals...</p>
      ) : deals.length === 0 ? (
        <p className="text-center text-gray-500">No active deals yet.</p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-[#1e293b] rounded-lg shadow p-4 hover:ring-2 ring-blue-500 transition"
            >
              <h2 className="font-bold text-lg mb-1">{deal.title}</h2>
              <p className="text-sm text-gray-400 mb-2 truncate">{deal.description || 'No description provided.'}</p>
              <div className="text-sm flex justify-between items-center mb-2">
                <span className="text-gray-300">${deal.amount}</span>
                <span className={`font-semibold ${getStatusColor(deal.status)}`}>
                  {deal.status.toUpperCase()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <Link
                  to={`/deal/${deal.id}`}
                  className="text-blue-400 text-sm hover:underline"
                >
                  View Details
                </Link>
                <button
                  onClick={() => navigate(`/chat-support?deal_id=${deal.id}`)}
                  className="flex items-center text-sm text-blue-300 hover:text-blue-400"
                >
                  <FiMessageCircle className="mr-1" /> Chat
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-10">
        <Link
          to="/start-deal"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded font-medium"
        >
          Start New Deal
        </Link>
      </div>
    </main>
  );
};

export default Deals;