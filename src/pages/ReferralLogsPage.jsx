// File: src/pages/ReferralLogsPage.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiUserPlus, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ReferralLogsPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/referral-logs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data || []);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load referral logs.');
      toast.error(err.response?.data?.detail || 'Could not fetch referral logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Admin Referral Logs | Dealcross</title>
        <meta name="description" content="Track user referral bonuses and rewards in Dealcross admin dashboard." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiUserPlus className="text-green-400" /> Referral Logs
          </h2>
          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded text-sm"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-yellow-400">Loading referral logs...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-400">No referral records found.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-gray-700 hover:border-gray-600"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">
                      Referrer: <span className="text-blue-400">{log.referrer_email}</span>
                    </h4>
                    <p className="text-sm text-gray-400">
                      Referred: {log.referred_email} | Source: <strong>{log.source}</strong>
                    </p>
                    <p className="text-sm text-green-400 font-medium">Amount: ${log.amount}</p>
                  </div>
                  <p className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ReferralLogsPage;