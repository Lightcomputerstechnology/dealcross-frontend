// File: src/components/admin/PendingDealList.jsx

import React, { useEffect, useState } from 'react';
import { getPendingDeals, approveDealById } from '@/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

const PendingDealList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDeals = async () => {
    try {
      const res = await getPendingDeals(); // ✅ backend-connected
      setDeals(res || []);
    } catch (err) {
      toast.error('Failed to load pending deals.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (dealId) => {
    const confirm = window.confirm('Approve this deal?');
    if (!confirm) return;

    try {
      await approveDealById(dealId); // ✅ backend-connected
      toast.success('Deal approved!');
      fetchDeals(); // Refresh list
    } catch (err) {
      toast.error('Approval failed');
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow mt-8 animate-fade-in">
      <h3 className="font-semibold mb-3 text-white">Pending Deal Approvals</h3>

      {loading ? (
        <LoadingSpinner size={32} fullPage={false} />
      ) : deals.length === 0 ? (
        <p className="text-gray-400 text-sm">No pending deals available.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {deals.map((deal) => (
            <li
              key={deal.id}
              className="flex justify-between items-center text-gray-300 border-b border-gray-700 pb-2"
            >
              <span>{deal.title} — ${deal.amount}</span>
              <button
                onClick={() => handleApprove(deal.id)}
                className="bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-700 transition"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingDealList;
