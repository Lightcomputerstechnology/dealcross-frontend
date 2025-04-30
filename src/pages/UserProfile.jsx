// File: src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';

const UserProfile = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('https://d-final.onrender.com/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({ username: res.data.username, email: res.data.email, password: '' });
      } catch (err) {
        toast.error('Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('https://d-final.onrender.com/user/profile/update', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Profile updated successfully');
      setForm({ ...form, password: '' });
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Update failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet>
        <title>User Profile - Dealcross</title>
      </Helmet>

      <div className="max-w-xl mx-auto bg-[#1e293b] p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-xl font-bold text-center">My Profile</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-1">New Password (optional)</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold"
          >
            Update Profile
          </button>

          {status && <p className="text-yellow-400 text-center">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default UserProfile;