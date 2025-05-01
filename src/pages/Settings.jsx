import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, updateProfile } from '@/api';
import { toast } from 'react-hot-toast';

const SettingsPage = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    notifications: true,
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setForm((prev) => ({
          ...prev,
          username: data.username,
          email: data.email,
          notifications: data.notifications ?? true,
        }));
      } catch {
        const local = JSON.parse(localStorage.getItem('user'));
        if (local) {
          setForm((prev) => ({
            ...prev,
            username: local.username,
            email: local.email,
            notifications: local.notifications ?? true,
          }));
        } else {
          toast.error('Failed to load settings');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updates = {
        username: form.username,
        email: form.email,
        password: form.password || undefined,
        notifications: form.notifications,
      };
      const updated = await updateProfile(updates);
      localStorage.setItem('user', JSON.stringify(updated));
      toast.success('Settings updated');
    } catch (err) {
      toast.error(err.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <Helmet><title>Account Settings - Dealcross</title></Helmet>

      <div className="max-w-md mx-auto bg-[#1e293b] p-6 rounded-lg shadow space-y-6">
        <h2 className="text-2xl font-bold">Account Settings</h2>

        {loading ? (
          <p className="text-yellow-400">Loading...</p>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">New Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
                className="accent-blue-500"
              />
              <label className="text-sm text-gray-300">Enable email notifications</label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-sm text-blue-400 hover:underline"
              >
                Change Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;