// File: src/pages/EscrowDashboard.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiRefreshCw, FiDownloadCloud, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import axios from 'axios';

const EscrowDashboard = () => {
  const [escrows, setEscrows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEscrows = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/escrow-summary', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEscrows(res.data || []);
    } catch (err) {
      console.error('Failed to fetch escrows:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEscrows();
  }, []);

  const summary = {
    active: escrows.filter((e) => e.status === 'active').length,
    pending: escrows.filter((e) => e.status === 'pending').length,
    completed: escrows.filter((e) => e.status === 'completed').length,
  };

  const downloadCSV = () => {
    const headers = 'Title,Amount,Status,Date\n';
    const rows = escrows
      .map((e) =>
        `${e.title || 'N/A'},${e.amount || 0},${e.status || 'N/A'},${new Date(e.created_at).toLocaleDateString()}`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'escrow_summary.csv';
    link.click();
  };

  return (
    <>
      <Helmet>
        <title>Escrow Dashboard - Dealcross</title>
        <meta
          name="description"
          content="Summary of ongoing escrow deals, statuses, and actions for Dealcross admin."
        />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Escrow Deal Summary</h1>
          <div className="flex gap-2">
            <button
              onClick={fetchEscrows}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
            >
              <FiRefreshCw /> Refresh
            </button>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-3 py-2 rounded"
            >
              <FiDownloadCloud /> Download CSV
            </button>
          </div>
        </div>

        {/* Status Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#1e293b] p-6 rounded-lg shadow">
            <div className="flex items-center gap-3 text-green-400">
              <FiCheckCircle /> Completed
            </div>
            <p className="text-3xl font-bold mt-2">{summary.completed}</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-lg shadow">
            <div className="flex items-center gap-3 text-blue-400">
              <FiClock /> Active
            </div>
            <p className="text-3xl font-bold mt-2">{summary.active}</p>
          </div>
          <div className="bg-[#1e293b] p-6 rounded-lg shadow">
            <div className="flex items-center gap-3 text-yellow-400">
              <FiXCircle /> Pending
            </div>
            <p className="text-3xl font-bold mt-2">{summary.pending}</p>
          </div>
        </div>

        {/* Escrow Table */}
        <div className="bg-[#1e293b] p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Escrow Deals</h2>
          {loading ? (
            <p className="text-yellow-400">Loading escrows...</p>
          ) : escrows.length === 0 ? (
            <p className="text-gray-400">No escrows found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-gray-400">
                  <tr>
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Amount</th>
                    <th className="pb-2">Status</th>
                    <th className="pb-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {escrows.map((e) => (
                    <tr key={e.id} className="border-t border-gray-700">
                      <td className="py-2">{e.title || 'N/A'}</td>
                      <td className="py-2">${e.amount?.toLocaleString() || '0'}</td>
                      <td className="py-2 capitalize">{e.status || 'N/A'}</td>
                      <td className="py-2">
                        {e.created_at ? new Date(e.created_at).toLocaleDateString() : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EscrowDashboard;