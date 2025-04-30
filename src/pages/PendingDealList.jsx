// File: src/pages/PendingDealList.jsx

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FiCheck, FiX, FiRefreshCw, FiDownload } from 'react-icons/fi';

const PendingDealList = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/pending-deals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDeals(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch pending deals.');
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (dealId, action) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://d-final.onrender.com/admin/deal-action/${dealId}`, { action }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`Deal ${action} successfully`);
      fetchDeals();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Action failed.');
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Title', 'Amount', 'Status', 'Counterparty', 'Created At'];
    const rows = deals.map(d =>
      [d.deal_id, d.title, d.amount, d.status, d.counterparty_id, new Date(d.created_at).toLocaleString()]
    );
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pending_deals.csv';
    link.click();
  };

  useEffect(() => {
    fetchDeals();
    const interval = setInterval(fetchDeals, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredDeals = deals.filter(
    (d) =>
      d.title.toLowerCase().includes(filter.toLowerCase()) ||
      d.counterparty_id.toString().includes(filter)
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>Pending Deals - Admin | Dealcross</title>
        <meta name="description" content="Manage and approve pending deals on Dealcross." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Pending Deal Approvals</h2>
        <div className="flex gap-2">
          <button onClick={fetchDeals} className="flex items-center gap-1 bg-blue-600 px-3 py-2 rounded hover:bg-blue-700">
            <FiRefreshCw /> Refresh
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1 bg-green-600 px-3 py-2 rounded hover:bg-green-700">
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by title or counterparty..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full bg-gray-800 text-white px-4 py-2 mb-6 rounded"
      />

      {loading ? (
        <p className="text-yellow-400">Loading pending deals...</p>
      ) : filteredDeals.length === 0 ? (
        <p className="text-gray-400">No pending deals found.</p>
      ) : (
        <div className="space-y-4">
          {filteredDeals.map((deal) => (
            <div key={deal.deal_id} className="bg-[#1e293b] p-4 rounded-lg shadow flex justify-between items-center">
              <div>
                <h4 className="font-semibold text-blue-400">{deal.title}</h4>
                <p className="text-sm text-gray-400">Amount: ${deal.amount}</p>
                <p className="text-xs text-gray-500">Counterparty ID: {deal.counterparty_id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(deal.deal_id, 'approve')}
                  className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm flex items-center gap-1"
                >
                  <FiCheck /> Approve
                </button>
                <button
                  onClick={() => handleAction(deal.deal_id, 'reject')}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm flex items-center gap-1"
                >
                  <FiX /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingDealList;