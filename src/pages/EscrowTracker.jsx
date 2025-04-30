// File: src/pages/EscrowTracker.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';

const EscrowTracker = () => {
  const [deals, setDeals] = useState([]);
  const [status, setStatus] = useState('Loading deals...');

  const getBadgeColor = (dealStatus) => {
    switch (dealStatus) {
      case 'Pending':
        return 'bg-yellow-500 text-black';
      case 'Active':
        return 'bg-blue-500 text-white';
      case 'Completed':
        return 'bg-green-500 text-white';
      case 'Disputed':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatRelativeTime = (timestamp) => {
    const delta = (Date.now() - new Date(timestamp)) / 1000;
    if (delta < 60) return `${Math.floor(delta)}s ago`;
    if (delta < 3600) return `${Math.floor(delta / 60)}m ago`;
    if (delta < 86400) return `${Math.floor(delta / 3600)}h ago`;
    return new Date(timestamp).toLocaleString();
  };

  useEffect(() => {
    const fetchDeals = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setStatus('Please log in to view your deals.');
        return;
      }

      try {
        const response = await axios.get('https://d-final.onrender.com/deals/tracker', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = response.data?.data;
        if (!data || data.length === 0) {
          setStatus('You have no deals yet.');
        } else {
          setDeals(data);
          setStatus(null);
        }
      } catch (error) {
        setStatus('Failed to load deals.');
        toast.error('Error fetching deals.');
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>Escrow Deal Tracker - Dealcross</title>
        <meta name="description" content="Track all your active and past escrow deals on Dealcross." />
      </Helmet>

      <h2 className="text-2xl font-bold mb-6">Escrow Deal Tracker</h2>

      {status ? (
        <p className="text-yellow-400 mb-6">{status}</p>
      ) : (
        <div className="space-y-4">
          {deals.map((deal) => (
            <div
              key={deal.deal_id || deal.id}
              className="bg-[#1e293b] p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{deal.title || 'Untitled Deal'}</h4>
                <p className="text-xs text-gray-400">{formatRelativeTime(deal.created_at)}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-400">
                  ${deal.amount ? Number(deal.amount).toLocaleString() : '0.00'}
                </p>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    getBadgeColor(deal.status?.label || 'Unknown')
                  }`}
                >
                  {deal.status?.label || 'Unknown'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EscrowTracker;