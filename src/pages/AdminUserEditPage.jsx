// File: src/pages/AdminUserEditPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { FiTrash, FiSave } from 'react-icons/fi';

const AdminUserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: '', role: 'user', status: 'active', email_verified: false });
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`https://d-final.onrender.com/admin/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setForm({
          email: res.data.email,
          role: res.data.role,
          status: res.data.status,
          email_verified: res.data.email_verified,
        });
      } catch (err) {
        toast.error('Failed to load user');
        navigate('/admin/user-control');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id, navigate]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://d-final.onrender.com/admin/users/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User updated');
      localStorage.setItem('user', JSON.stringify({ ...user, ...form }));
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Update failed');
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://d-final.onrender.com/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('User deleted');
      navigate('/admin/user-control');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Delete failed');
    }
  };

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10 max-w-2xl mx-auto">
      <Helmet>
        <title>Edit User - Admin | Dealcross</title>
      </Helmet>

      <h2 className="text-2xl font-bold mb-6">Edit User</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Role</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          >
            <option value="user">User</option>
            <option value="moderator">Moderator</option>
            <option value="auditor">Auditor</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          >
            <option value="active">Active</option>
            <option value="banned">Banned</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.email_verified}
            onChange={(e) => setForm({ ...form, email_verified: e.target.checked })}
          />
          <label>Email Verified</label>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            <FiTrash /> Delete
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            <FiSave /> Save
          </button>
        </div>

        {showConfirm && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-[#1e293b] p-6 rounded-lg shadow max-w-sm w-full space-y-4">
              <p className="text-lg font-semibold text-white">Confirm delete this user?</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserEditPage;
