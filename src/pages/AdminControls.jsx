import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const AdminControls = () => {
  useAuthRedirect({ adminOnly: true }); // Protect admin access

  const [logs, setLogs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/admin/user-logs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(response.data || []);
    } catch (error) {
      toast.error('Failed to load user logs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const filteredLogs = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase())
  );

  const relativeTime = (date) => {
    const delta = Math.floor((new Date() - new Date(date)) / 1000);
    if (delta < 60) return `${delta} sec ago`;
    if (delta < 3600) return `${Math.floor(delta / 60)} min ago`;
    if (delta < 86400) return `${Math.floor(delta / 3600)} hrs ago`;
    return `${Math.floor(delta / 86400)} days ago`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Admin Controls – User Activity Logs</h2>
        <button
          onClick={fetchLogs}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
        >
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <p className="text-gray-400">Loading logs...</p>
      ) : filteredLogs.length === 0 ? (
        <p className="text-yellow-400">No logs found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-700">
          <table className="min-w-full bg-gray-800 text-left">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Performed By (User ID)</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-gray-700 hover:bg-gray-700/40">
                  <td className="px-4 py-3">{log.action}</td>
                  <td className="px-4 py-3">{log.performed_by}</td>
                  <td className="px-4 py-3 text-sm text-gray-400">
                    {new Date(log.timestamp).toLocaleString()}
                    <br />
                    <span className="text-xs">{relativeTime(log.timestamp)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminControls;
