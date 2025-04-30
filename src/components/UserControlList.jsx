import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { FiUser, FiRefreshCw, FiDownload, FiShield, FiSlash } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const roles = ['user', 'moderator', 'auditor', 'admin'];

const UserControlList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('');

  const fetchUsers = async () => {
    setRefreshing(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
      toast.success('User list updated.');
    } catch (err) {
      toast.error('Failed to fetch users.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://d-final.onrender.com/admin/update-role/${userId}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User role updated.');
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to update role.');
    }
  };

  const handleBanToggle = async (userId, action) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://d-final.onrender.com/admin/${action}/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(`User ${action === 'ban' ? 'banned' : 'unbanned'} successfully.`);
      fetchUsers();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to update user status.');
    }
  };

  const exportCSV = () => {
    const headers = ['ID', 'Username', 'Email', 'Role', 'Status', 'Created At'];
    const rows = users.map(u =>
      [u.id, u.username, u.email, u.role, u.status, new Date(u.created_at).toLocaleString()]
    );
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    const timestamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0];
    link.download = `user_control_list_${timestamp}.csv`;
    link.click();
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 30000);
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(filter.toLowerCase()) ||
      u.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>User Control - Admin | Dealcross</title>
        <meta name="description" content="Admin control panel for managing user roles, statuses, and actions on Dealcross." />
        <meta name="keywords" content="admin, user management, roles, ban, unban, Dealcross" />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
        <h2 className="text-2xl font-bold">User Admin Controls</h2>
        <div className="flex gap-2">
          <button
            onClick={fetchUsers}
            className={`flex items-center gap-1 bg-blue-600 px-3 py-2 rounded hover:bg-blue-700 ${refreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={refreshing}
          >
            <FiRefreshCw /> {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button onClick={exportCSV} className="flex items-center gap-1 bg-green-600 px-3 py-2 rounded hover:bg-green-700">
            <FiDownload /> Export CSV
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search by username or email..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full bg-gray-800 text-white px-4 py-2 mb-6 rounded"
      />

      {loading ? (
        <p className="text-yellow-400">Loading users...</p>
      ) : filteredUsers.length === 0 ? (
        <p className="text-gray-400">No users found.</p>
      ) : (
        <div className="space-y-4">
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#1e293b] p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold text-blue-400">{user.username}</h4>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  <p className="text-xs text-gray-500">Role: {user.role} | Status: {user.status}</p>
                </div>
                <div className="flex gap-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="bg-gray-800 text-white px-2 py-1 rounded text-sm"
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                  {user.status === 'active' ? (
                    <button
                      onClick={() => handleBanToggle(user.id, 'ban')}
                      className="flex items-center gap-1 bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-700"
                    >
                      <FiSlash /> Ban
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBanToggle(user.id, 'unban')}
                      className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded text-sm hover:bg-green-700"
                    >
                      <FiShield /> Unban
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default UserControlList;