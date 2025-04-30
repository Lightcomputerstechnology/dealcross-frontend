// File: src/pages/UserProfileEditPage.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useNavigate } from 'react-router-dom';
import { getCurrentUser, updateProfile } from '@/api';
import { getUserDetail } from '@/api/optional';
import { toast } from 'react-hot-toast';
import { useUser } from '@/context/UserContext';

const UserProfileEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = id ? await getUserDetail(id) : await getCurrentUser();
        setForm({ username: data.username, email: data.email, password: '' });
      } catch (err) {
        toast.error('Failed to load user profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updated = await updateProfile(form);
      toast.success('Profile updated!');

      if (parseInt(id) === user?.id) {
        localStorage.setItem('user', JSON.stringify({ ...user, ...form }));
      }
      navigate('/profile');
    } catch (err) {
      toast.error(err.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Edit Profile - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-lg mx-auto bg-[#1e293b] p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

          {loading ? (
            <p className="text-yellow-400">Loading...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm">Username</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-gray-800 px-4 py-2 rounded"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm">New Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800 px-4 py-2 rounded"
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
              >
                {saving ? 'Saving...' : 'Update Profile'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfileEditPage;
