// File: src/pages/DealTrackerPage.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import {
  getMyDeals,
  deliverDeal,
  releaseDeal,
  disputeDeal,
} from '@/api';
import { toast } from 'react-hot-toast';

const DealTrackerPage = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const data = await getMyDeals();
      setDeals(data || []);
    } catch (err) {
      toast.error(err.message || 'Failed to fetch deals.');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      if (action === 'deliver') {
        await deliverDeal(id);
        toast.success('Marked as delivered.');
      } else if (action === 'release') {
        await releaseDeal(id);
        toast.success('Funds released.');
      } else if (action === 'dispute') {
        await disputeDeal(id, 'Issue raised by user.');
        toast.success('Deal disputed.');
      }
      fetchDeals();
    } catch (err) {
      toast.error(err.message || 'Action failed.');
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-[#0f172a] text-gray-900 dark:text-white">
      <Helmet>
        <title>Deal Tracker - Dealcross</title>
      </Helmet>

      <h1 className="text-3xl font-bold mb-6 text-center">My Deals</h1>

      {loading ? (
        <p className="text-center text-yellow-400">Loading deals...</p>
      ) : deals.length === 0 ? (
        <p className="text-center text-gray-400">No deals found.</p>
      ) : (
        <div className="max-w-6xl mx-auto overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 dark:border-gray-700">
            <thead className="bg-gray-200 dark:bg-gray-800">
              <tr>
                <th className="py-2 px-3 text-left">ID</th>
                <th className="py-2 px-3 text-left">Title</th>
                <th className="py-2 px-3 text-left">Counterparty</th>
                <th className="py-2 px-3 text-left">Amount ($)</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <tr
                  key={deal.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <td className="py-2 px-3">{deal.id}</td>
                  <td className="py-2 px-3">{deal.title}</td>
                  <td className="py-2 px-3">{deal.counterparty_name || 'N/A'}</td>
                  <td className="py-2 px-3">${deal.amount}</td>
                  <td className="py-2 px-3 font-medium capitalize">
                    <span
                      className={`${
                        deal.status === 'completed'
                          ? 'text-green-500'
                          : deal.status === 'pending'
                          ? 'text-yellow-400'
                          : deal.status === 'disputed'
                          ? 'text-red-500'
                          : 'text-blue-400'
                      }`}
                    >
                      {deal.status}
                    </span>
                  </td>
                  <td className="py-2 px-3 space-x-2">
                    {deal.status === 'active' && (
                      <button
                        onClick={() => handleAction(deal.id, 'deliver')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {deal.status === 'completed' && (
                      <button
                        onClick={() => handleAction(deal.id, 'release')}
                        className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Release
                      </button>
                    )}
                    {['active', 'completed'].includes(deal.status) && (
                      <button
                        onClick={() => handleAction(deal.id, 'dispute')}
                        className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                      >
                        Dispute
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DealTrackerPage;