import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FiRefreshCw, FiDownload, FiAlertTriangle, FiInfo, FiXCircle } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const SystemLogsViewerPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(
        `https://d-final.onrender.com/admin/system-logs?page=${page}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLogs(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to load system logs.');
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    const headers = ['Timestamp', 'Level', 'Message'];
    const rows = logs.map((log) => [
      new Date(log.timestamp).toLocaleString(),
      log.level,
      log.message.replace(/[\n\r]/g, ' '),
    ]);
    const csvContent = [headers, ...rows].map((e) => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'system_logs.csv';
    link.click();
  };

  useEffect(() => {
    fetchLogs();
  }, [page]);

  const filteredLogs = logs.filter(
    (log) =>
      log.message.toLowerCase().includes(filter.toLowerCase()) ||
      log.level.toLowerCase().includes(filter.toLowerCase())
  );

  const renderIcon = (level) => {
    if (level === 'error') return <FiXCircle className="text-red-400" />;
    if (level === 'warning') return <FiAlertTriangle className="text-yellow-400" />;
    return <FiInfo className="text-green-400" />;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>System Logs - Admin | Dealcross</title>
        <meta
          name="description"
          content="View detailed system logs for troubleshooting and monitoring."
        />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">System Logs Viewer</h2>
        <div className="flex gap-2">
          <button
            onClick={fetchLogs}
            className="flex items-center gap-1 bg-blue-600 px-3 py-2 rounded hover:bg-blue-700"
          >
            <FiRefreshCw /> Refresh
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-1 bg-green-600 px-3 py-2 rounded hover:bg-green-700"
          >
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Filter by message or level..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full bg-gray-800 text-white px-4 py-2 mb-4 rounded"
      />

      {loading ? (
        <p className="text-yellow-400">Loading logs...</p>
      ) : filteredLogs.length === 0 ? (
        <p className="text-gray-400">No logs match the filter.</p>
      ) : (
        <div className="space-y-4">
          {filteredLogs.map((log, idx) => (
            <div
              key={idx}
              className="bg-[#1e293b] p-4 rounded-lg shadow-md border border-gray-700 flex gap-4 items-start"
            >
              {renderIcon(log.level)}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                  <span
                    className={`px-2 py-1 text-xs rounded ${
                      log.level === 'error'
                        ? 'bg-red-600'
                        : log.level === 'warning'
                        ? 'bg-yellow-600'
                        : 'bg-green-600'
                    }`}
                  >
                    {log.level.toUpperCase()}
                  </span>
                </div>
                <p className="font-semibold mt-1">{log.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-10 flex justify-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-800 rounded">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SystemLogsViewerPage;
