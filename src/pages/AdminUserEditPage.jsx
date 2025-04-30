// File: src/pages/AdminUserEditPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FiUserCheck, FiUserX } from 'react-icons/fi';

const AdminUserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', is_active: true, is_admin: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://d-final.onrender.com/user/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const found = response.data.find((u) => u.id === parseInt(id));
        if (!found) {
          toast.error('User not found.');
          navigate('/admin');
          return;
        }
        setUser(found);
        setForm({
          username: found.username || '',
          email: found.email || '',
          is_active: found.status === 'active',
          is_admin: found.is_admin || false,
        });
        setLoading(false);
      } catch (err) {
        toast.error('Failed to load user.');
        navigate('/admin');
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(
        `https://d-final.onrender.com/user/admin/update/${id}`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('User updated successfully!');
      navigate('/admin/user-control'); // Adjust this to your actual admin route
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Update failed.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white bg-[#0f172a]">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Edit User - Dealcross Admin</title>
        <meta name="description" content="Edit user details as admin." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-xl mx-auto bg-[#1e293b] p-6 rounded-xl shadow space-y-6">
          <h2 className="text-2xl font-bold mb-2">Edit User</h2>

          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-700"
            placeholder="Username"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-700"
            placeholder="Email"
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="accent-blue-600"
            />
            <label className="text-sm">Account Active</label>
            {form.is_active ? <FiUserCheck className="text-green-400" /> : <FiUserX className="text-red-400" />}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.is_admin}
              onChange={(e) => setForm({ ...form, is_admin: e.target.checked })}
              className="accent-yellow-500"
            />
            <label className="text-sm">Grant Admin Privileges</label>
          </div>

          <div className="flex justify-end gap-4">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserEditPage;