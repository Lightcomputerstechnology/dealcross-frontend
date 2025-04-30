// File: src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { getCurrentUser, updateProfile } from '@/api';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const data = await getCurrentUser();
      setProfile(data);
      setForm({ username: data.username, email: data.email, password: '' });
    } catch (err) {
      toast.error('Failed to load profile.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const updated = await updateProfile(form);
      setProfile(updated);
      toast.success('Profile updated.');
      localStorage.setItem('user', JSON.stringify({ ...profile, ...form }));
      setEditing(false);
    } catch (err) {
      toast.error(err.message || 'Update failed.');
    }
  };

  return (
    <>
      <Helmet>
        <title>User Profile - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto bg-[#1e293b] p-6 rounded-xl shadow space-y-4">
          <h1 className="text-2xl font-bold">My Profile</h1>

          {loading ? (
            <p className="text-yellow-400">Loading...</p>
          ) : !editing ? (
            <>
              <p><strong>Username:</strong> {profile?.username}</p>
              <p><strong>Email:</strong> {profile?.email}</p>
              <button
                onClick={() => setEditing(true)}
                className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <div className="space-y-4">
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
              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}