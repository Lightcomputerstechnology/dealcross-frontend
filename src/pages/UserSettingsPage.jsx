import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getUserSettings, getCurrentUser, updateProfile } from '@/api';
import { toast } from 'react-hot-toast';

export default function UserSettingsPage() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userInfo = await getCurrentUser();
        const settingInfo = await getUserSettings();

        setUser(userInfo);
        setSettings(settingInfo);

        setForm({
          username: userInfo.username || '',
          email: userInfo.email || '',
          password: '',
        });
      } catch (err) {
        toast.error('Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const updated = await updateProfile(form);
      localStorage.setItem('user', JSON.stringify(updated));
      toast.success('Profile updated');
    } catch (err) {
      toast.error(err.message || 'Update failed.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-[#0f172a] text-white">
      <Helmet>
        <title>User Settings - Dealcross</title>
      </Helmet>

      <div className="max-w-2xl mx-auto bg-[#1e293b] p-8 rounded-xl shadow space-y-6">
        <h2 className="text-2xl font-bold">Account Settings</h2>

        {loading ? (
          <p className="text-yellow-400">Loading settings...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              <input
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">New Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-800 rounded"
                placeholder="Leave blank to keep current"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
            >
              {updating ? 'Updating...' : 'Save Changes'}
            </button>

            {settings?.fee_rates && (
              <div className="mt-8 text-sm text-gray-300">
                <h4 className="text-lg font-semibold mb-2">Your Fee Tier: {settings.tier}</h4>
                <ul className="space-y-1 list-disc pl-5">
                  {Object.entries(settings.fee_rates).map(([key, val]) => (
                    <li key={key}>
                      {key.replace(/_/g, ' ')}: {val}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}