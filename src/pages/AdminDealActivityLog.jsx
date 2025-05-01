// File: src/pages/admin/AdminDealActivityLog.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { Helmet } from 'react-helmet';
import useAuthRedirect from '@/hooks/useAuthRedirect';

export default function AdminDealActivityLog() {
  useAuthRedirect({ adminOnly: true });

  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState('Loading deal activity log...');
  const [filterStatus, setFilterStatus] = useState('all');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return setStatus('Admin login required.');

    axios
      .get('https://d-final.onrender.com/admin/deal-activity-log', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setLogs(res.data || []);
        setStatus(null);
      })
      .catch(() => setStatus('Failed to load deal activity log.'));
  }, []);

  const filteredLogs = logs.filter((log) => {
    const amount = parseFloat(log.amount);
    const created = new Date(log.created_at);
    const matchStatus =
      filterStatus === 'all' ||
      (filterStatus === 'public' && log.is_public) ||
      (filterStatus === 'private' && !log.is_public);
    const matchAmount =
      (!minAmount || amount >= parseFloat(minAmount)) &&
      (!maxAmount || amount <= parseFloat(maxAmount));
    const matchDate =
      (!dateFrom || new Date(dateFrom) <= created) &&
      (!dateTo || new Date(dateTo) >= created);
    return matchStatus && matchAmount && matchDate;
  });

  const csvData = filteredLogs.map((log) => ({
    ID: log.id,
    Title: log.title,
    Amount: log.amount,
    Public: log.is_public ? 'Yes' : 'No',
    Timestamp: new Date(log.created_at).toLocaleString(),
  }));

  return (
    <>
      <Helmet>
        <title>Deal Activity Log - Dealcross Admin</title>
        <meta name="description" content="Filterable, exportable admin logs of real and public deal activity." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <h1 className="text-2xl font-bold mb-6">Deal Activity Log</h1>

        {/* Filters */}
        <div className="bg-[#1e293b] p-4 rounded-lg shadow mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-3 py-2 rounded text-sm"
            >
              <option value="all">All Deals</option>
              <option value="public">Public Only</option>
              <option value="private">Private Only</option>
            </select>

            <input
              type="number"
              placeholder="Min Amount"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-3 py-2 rounded w-36 text-sm"
            />
            <input
              type="number"
              placeholder="Max Amount"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-3 py-2 rounded w-36 text-sm"
            />
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-3 py-2 rounded text-sm"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="bg-gray-800 border border-gray-600 px-3 py-2 rounded text-sm"
            />

            {filteredLogs.length > 0 && (
              <CSVLink
                data={csvData}
                filename="dealcross_deal_log.csv"
                className="ml-auto bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white text-sm"
              >
                Export CSV
              </CSVLink>
            )}
          </div>
        </div>

        {/* Log Entries */}
        {status && <p className="text-yellow-400 mb-4">{status}</p>}

        {filteredLogs.length > 0 ? (
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="bg-[#1e293b] p-4 rounded-lg shadow border border-gray-700"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-lg font-semibold">{log.title}</h2>
                  <span className="text-sm bg-blue-700 px-2 py-0.5 rounded text-white">
                    {log.is_public ? 'Public' : 'Private'}
                  </span>
                </div>
                <p className="text-sm text-gray-300">Amount: <strong>${log.amount}</strong></p>
                <p className="text-sm text-gray-400">Created: {new Date(log.created_at).toLocaleString()}</p>
              </div>
            ))}
          </div>
        ) : (
          !status && <p className="text-center text-gray-500">No logs match your filters.</p>
        )}
      </div>
    </>
  );
    }
