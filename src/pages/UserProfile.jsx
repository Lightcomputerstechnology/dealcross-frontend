// File: src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ email: '', username: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser(parsed);
      setForm({ email: parsed.email, username: parsed.username });
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(
        'https://d-final.onrender.com/users/update-profile',
        { email: form.email, username: form.username },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Profile updated!');
      const updatedUser = { ...user, email: form.email, username: form.username };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>User Profile - Dealcross</title>
        <meta name="description" content="Edit and manage your user profile on Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto bg-[#1e293b] p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block mb-1 text-sm text-gray-400">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                disabled={saving}
                className={`px-6 py-2 rounded font-semibold ${
                  saving ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {saving ? 'Updating...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserProfile;