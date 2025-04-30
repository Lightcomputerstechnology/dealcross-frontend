// File: src/pages/ExchangeRatesViewerPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const ExchangeRatesViewerPage = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  const fetchRates = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://d-final.onrender.com/admin/exchange-rates', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRates(response.data?.data || []);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to fetch exchange rates.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const filteredRates = rates.filter(
    (rate) =>
      rate.currency?.toLowerCase().includes(filter.toLowerCase()) ||
      rate.symbol?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>Exchange Rates - Admin | Dealcross</title>
        <meta name="description" content="View and monitor currency exchange rates for Dealcross transactions." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Exchange Rates Viewer</h2>
        <button
          onClick={fetchRates}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          <FiRefreshCw /> Refresh
        </button>
      </div>

      <input
        type="text"
        placeholder="Filter by currency or symbol..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full bg-gray-800 text-white px-4 py-2 mb-4 rounded placeholder-gray-400"
      />

      {loading ? (
        <p className="text-yellow-400">Loading exchange rates...</p>
      ) : filteredRates.length === 0 ? (
        <p className="text-gray-400">No rates found.</p>
      ) : (
        <div className="space-y-4">
          {filteredRates.map((rate, idx) => (
            <div
              key={idx}
              className="bg-[#1e293b] p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">
                  {rate.currency || 'N/A'} ({rate.symbol || '-'})
                </p>
                <p className="text-sm text-gray-400">
                  {rate.updated_at
                    ? new Date(rate.updated_at).toLocaleString()
                    : 'Not updated yet'}
                </p>
              </div>
              <p className="text-xl font-bold text-green-400">
                {rate.rate !== undefined ? rate.rate : '0.00'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExchangeRatesViewerPage;