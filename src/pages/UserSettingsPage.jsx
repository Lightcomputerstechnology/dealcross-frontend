import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getUserSettings, updateProfile, verifyEmail } from '@/api';
import { toast } from 'react-hot-toast';

const UserSettingsPage = () => {
  const [settings, setSettings] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getUserSettings();
        setSettings(data);
        setForm({ username: data.username || '', email: data.email || '', password: '' });
      } catch (err) {
        toast.error('Failed to load settings.');
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
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
      toast.success('Profile updated successfully');
      localStorage.setItem('user', JSON.stringify(updated));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleEmailVerify = async () => {
    setVerifying(true);
    try {
      const result = await verifyEmail();
      toast.success(result?.message || 'Verification email sent!');
    } catch (err) {
      toast.error(err.message || 'Verification failed.');
    } finally {
      setVerifying(false);
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
              {settings?.email_verified ? (
                <span className="text-green-400 text-sm mt-1 inline-block">Verified</span>
              ) : (
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-yellow-400 text-sm">Not Verified</span>
                  <button
                    onClick={handleEmailVerify}
                    disabled={verifying}
                    type="button"
                    className="text-sm bg-yellow-600 px-3 py-1 rounded hover:bg-yellow-700"
                  >
                    {verifying ? 'Sending...' : 'Verify Email'}
                  </button>
                </div>
              )}
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
                    <li key={key}>{key.replace(/_/g, ' ')}: {val}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default UserSettingsPage;