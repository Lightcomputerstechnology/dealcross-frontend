// File: src/pages/AdminDealLog.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { FiFileText, FiAlertCircle } from 'react-icons/fi';

const AdminDealLog = () => {
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('Loading...');

  const fetchLogs = async () => {
    try {
      const res = await axios.get('https://d-final.onrender.com/admin/deal-activity-log');
      setLogs(res.data);
      setStatus(null);
    } catch (err) {
      console.error('Failed to load deal logs:', err);
      setStatus('Failed to load deal logs.');
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <>
      <Helmet>
        <title>Deal Activity Logs - Admin | Dealcross</title>
        <meta 
          name="description" 
          content="View all administrative deal activity logs for moderation and auditing on Dealcross." 
        />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-4 md:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <FiFileText className="text-blue-500 w-6 h-6" />
          <h1 className="text-2xl font-bold">Admin Deal Activity Logs</h1>
        </div>

        {/* Status/Error */}
        {status && (
          <div className="flex items-center gap-2 text-yellow-400 mb-4">
            <FiAlertCircle />
            <p>{status}</p>
          </div>
        )}

        {/* Deal Logs */}
        <div className="space-y-4">
          {!status && logs.length === 0 && (
            <p className="text-gray-400">No deal logs available.</p>
          )}

          {logs.map((log) => (
            <div key={log.id} className="bg-[#1e293b] p-5 rounded-lg shadow border border-gray-700 transition hover:border-blue-500">
              <h3 className="text-lg font-semibold text-blue-400">{log.title}</h3>
              <p className="text-sm text-gray-300">Amount: ${log.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-400">
                Public: <span className={log.is_public ? 'text-green-400' : 'text-red-400'}>
                  {log.is_public ? 'Yes' : 'No'}
                </span>
              </p>
              <p className="text-xs text-gray-500">Created: {new Date(log.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminDealLog;
