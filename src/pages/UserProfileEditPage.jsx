// File: src/pages/UserProfileEditPage.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { getCurrentUser, updateProfile } from '@/api';

export default function UserProfileEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setForm({ username: user.username, email: user.email, password: '' });
      } catch (err) {
        toast.error('Failed to fetch user.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      await updateProfile(form);
      toast.success('Profile updated!');
      navigate('/profile');
    } catch (err) {
      toast.error(err.message || 'Update failed.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Profile - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-xl mx-auto bg-[#1e293b] p-6 rounded-xl shadow space-y-4">
          <h1 className="text-2xl font-bold">Edit My Profile</h1>

          {loading ? (
            <p className="text-yellow-400">Loading...</p>
          ) : (
            <>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Username"
                className="w-full px-4 py-2 bg-gray-800 rounded"
              />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
                className="w-full px-4 py-2 bg-gray-800 rounded"
              />
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="New Password (optional)"
                className="w-full px-4 py-2 bg-gray-800 rounded"
              />
              <div className="flex gap-4">
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => navigate('/profile')}
                  className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}