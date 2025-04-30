// File: src/pages/admin/AdminFraudLogPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { CSVLink } from 'react-csv';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const AdminFraudLogPage = () => {
  useAuthRedirect({ adminOnly: true });

  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('Loading fraud alerts...');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('Admin login required.');
      return;
    }

    axios
      .get('https://d-final.onrender.com/admin/fraud-log', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLogs(res.data || []);
        setStatus(null);
      })
      .catch(() => setStatus('Failed to load fraud logs.'));
  }, []);

  const filtered = logs.filter((log) =>
    log.message.toLowerCase().includes(search.toLowerCase())
  );

  const csvData = filtered.map((log, i) => ({
    ID: i + 1,
    Message: log.message,
    Type: log.type,
    Severity: log.severity,
    Timestamp: log.created_at,
  }));

  return (
    <>
      <Helmet>
        <title>Fraud Alerts - Dealcross Admin</title>
        <meta name="description" content="Admin view of flagged fraud activities and alerts." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Fraud Reports & Alerts</h1>
          {filtered.length > 0 && (
            <CSVLink
              data={csvData}
              filename="fraud_logs_dealcross.csv"
              className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm"
            >
              Export CSV
            </CSVLink>
          )}
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by message or type"
          className="mb-6 px-4 py-2 w-full md:w-1/2 rounded bg-gray-800 border border-gray-700"
        />

        {status && <p className="text-yellow-400 mb-4">{status}</p>}

        <div className="space-y-4">
          {filtered.map((log, i) => (
            <div
              key={i}
              className="bg-[#1e293b] p-4 rounded border border-gray-700 shadow-md transition hover:border-blue-500"
            >
              <p className="text-sm text-gray-400 mb-1">Time: {new Date(log.created_at).toLocaleString()}</p>
              <p className="text-lg font-semibold">{log.message}</p>
              <div className="flex justify-between text-sm text-gray-400 mt-2">
                <span>Type: {log.type}</span>
                <span
                  className={`font-bold ${
                    log.severity === 'high'
                      ? 'text-red-400'
                      : log.severity === 'medium'
                      ? 'text-yellow-400'
                      : 'text-green-400'
                  }`}
                >
                  {log.severity?.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminFraudLogPage;
