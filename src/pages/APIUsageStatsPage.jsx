// File: src/pages/APIUsageStatsPage.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FiRefreshCw, FiDownload } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const APIUsageStatsPage = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/api-usage', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to load API usage stats.');
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Endpoint', 'Calls', 'Last Accessed'];
    const rows = stats.map(stat => [
      stat.endpoint,
      stat.calls,
      new Date(stat.last_accessed).toLocaleString()
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'api_usage_stats.csv';
    link.click();
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>API Usage Stats - Admin | Dealcross</title>
        <meta name="description" content="Track API endpoint usage on the Dealcross platform for performance monitoring." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">API Usage Statistics</h2>
        <div className="flex gap-2">
          <button onClick={fetchStats} className="flex items-center gap-1 bg-blue-600 px-3 py-2 rounded hover:bg-blue-700">
            <FiRefreshCw /> Refresh
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1 bg-green-600 px-3 py-2 rounded hover:bg-green-700">
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-yellow-400">Loading stats...</p>
      ) : stats.length === 0 ? (
        <p className="text-gray-400">No API usage data available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-[#1e293b] rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-gray-300">
              <tr>
                <th className="px-4 py-2 text-left">Endpoint</th>
                <th className="px-4 py-2 text-left">Calls</th>
                <th className="px-4 py-2 text-left">Last Accessed</th>
              </tr>
            </thead>
            <tbody>
              {stats.map((stat, idx) => (
                <tr key={idx} className="border-t border-gray-700">
                  <td className="px-4 py-2">{stat.endpoint}</td>
                  <td className="px-4 py-2">{stat.calls}</td>
                  <td className="px-4 py-2">{new Date(stat.last_accessed).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default APIUsageStatsPage;
