// File: src/pages/AdminRoleManagementPage.jsx

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FiUserCheck, FiUserX, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AdminRoleManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
    } catch (err) {
      toast.error('Failed to load user roles.');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`https://d-final.onrender.com/admin/update-role/${userId}`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Role updated successfully!');
      fetchUsers();
    } catch (err) {
      toast.error('Failed to update role.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>Admin Role Management - Dealcross</title>
        <meta name="description" content="Manage user roles and permissions within Dealcross admin panel." />
      </Helmet>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Role Management</h2>
        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          <FiRefreshCw /> Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-yellow-400">Loading users...</p>
      ) : users.length === 0 ? (
        <p className="text-gray-400">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-[#1e293b] p-4 rounded-lg flex justify-between items-center shadow"
            >
              <div>
                <h4 className="font-semibold">{user.username}</h4>
                <p className="text-sm text-gray-400">{user.email}</p>
                <p className="text-xs text-gray-500">Current Role: {user.role}</p>
              </div>
              <select
                value={user.role}
                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                className="bg-gray-800 text-white px-2 py-1 rounded"
              >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="auditor">Auditor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminRoleManagementPage;
