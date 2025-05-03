import React, { useEffect, useState } from 'react';
import { getPendingDeals, approveDealById } from '@/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';

const PendingDealList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);

  const fetchDeals = async () => {
    try {
      const res = await getPendingDeals();
      setDeals(res || []);
    } catch (err) {
      toast.error('Failed to load pending deals.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (dealId) => {
    if (!window.confirm('Approve this deal?')) return;

    setApprovingId(dealId);
    try {
      await approveDealById(dealId);
      toast.success('Deal approved!');
      fetchDeals();
    } catch (err) {
      toast.error('Approval failed');
    } finally {
      setApprovingId(null);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow mt-8 animate-fade-in">
      <h3 className="text-lg font-semibold mb-4 text-white">Pending Deal Approvals</h3>

      {loading ? (
        <LoadingSpinner size={32} fullPage={false} />
      ) : deals.length === 0 ? (
        <p className="text-gray-400 text-sm">No pending deals available.</p>
      ) : (
        <ul className="space-y-4 text-sm">
          {deals.map((deal) => (
            <li
              key={deal.id}
              className="flex justify-between items-center border-b border-gray-700 pb-3 text-gray-300"
            >
              <div>
                <p className="font-medium text-yellow-400">{deal.title}</p>
                <p className="text-xs text-gray-500">${parseFloat(deal.amount).toLocaleString()}</p>
              </div>
              <button
                onClick={() => handleApprove(deal.id)}
                className={`bg-blue-600 px-3 py-1.5 rounded text-white hover:bg-blue-700 transition ${
                  approvingId === deal.id ? 'opacity-50 cursor-wait' : ''
                }`}
                disabled={approvingId === deal.id}
              >
                {approvingId === deal.id ? 'Approving...' : 'Approve'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PendingDealList;