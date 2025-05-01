import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { FiBell, FiRefreshCw, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const AdminNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`https://d-final.onrender.com/admin/notifications?page=${page}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page]);

  const filtered = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(filter.toLowerCase()) ||
      n.message.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>Admin Notifications - Dealcross</title>
        <meta name="description" content="View important platform notifications and alerts." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FiBell /> Admin Notifications
        </h2>
        <button
          onClick={fetchNotifications}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          <FiRefreshCw /> Refresh
        </button>
      </div>

      <input
        type="text"
        placeholder="Search title or message..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full bg-gray-800 text-white px-4 py-2 mb-4 rounded"
      />

      {loading ? (
        <p className="text-yellow-400">Loading notifications...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-400">No notifications found.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((note) => (
            <div
              key={note.id}
              className="bg-[#1e293b] p-4 rounded shadow border border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{note.title}</h3>
                  <p className="text-sm text-gray-300">{note.message}</p>
                </div>
                <span className="text-xs bg-green-600 px-2 py-1 rounded">
                  {new Date(note.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default AdminNotificationsPage;
