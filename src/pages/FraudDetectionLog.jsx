// File: src/pages/FraudDetectionLog.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const getBadgeColor = (severity) => {
  switch (severity) {
    case 'High':
      return 'bg-red-600 text-white';
    case 'Medium':
      return 'bg-yellow-500 text-black';
    case 'Low':
      return 'bg-green-500 text-black';
    default:
      return 'bg-gray-500 text-white';
  }
};

const FraudDetectionLog = () => {
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/admin/fraud-alerts', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(response.data || []);
    } catch (err) {
      toast.error('Failed to load fraud alerts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      <Helmet>
        <title>Fraud Detection Log - Dealcross</title>
        <meta name="description" content="Admin fraud detection logs, including flagged user activities." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiAlertTriangle className="text-red-500" /> Fraud Detection Log
          </h2>
          <button
            onClick={fetchLogs}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {loading ? (
          <p className="text-yellow-400">Loading fraud alerts...</p>
        ) : logs.length === 0 ? (
          <p className="text-gray-400">No fraud alerts found.</p>
        ) : (
          <div className="space-y-4">
            {logs.map((log, index) => (
              <div
                key={index}
                className="bg-[#1e293b] p-4 rounded-lg flex justify-between items-start shadow"
              >
                <div>
                  <h4 className="text-lg font-semibold">{log.alert_type || 'Unknown Alert'}</h4>
                  <p className="text-sm text-gray-400">
                    User ID: <span className="text-white">{log.user_id || 'N/A'}</span> —{' '}
                    {log.created_at ? new Date(log.created_at).toLocaleString() : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{log.description || 'No description provided.'}</p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    getBadgeColor(log.severity || 'Unknown')
                  }`}
                >
                  {log.severity || 'Unknown'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FraudDetectionLog;