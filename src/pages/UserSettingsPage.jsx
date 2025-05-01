import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { getUserSettings, updateProfile, requestEmailVerification } from '@/api/optional';

export default function UserSettingsPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  const fetchSettings = async () => {
    try {
      const data = await getUserSettings();
      setForm({ username: data.username, email: data.email, password: '' });
    } catch (err) {
      toast.error('Failed to load settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(form);
      toast.success('Profile updated.');
    } catch (err) {
      toast.error(err.message || 'Update failed.');
    }
  };

  const handleEmailVerify = async () => {
    try {
      setVerifying(true);
      const result = await requestEmailVerification();
      toast.success(result?.message || 'Verification email sent!');
    } catch (err) {
      toast.error(err.message || 'Verification request failed.');
    } finally {
      setVerifying(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return (
    <>
      <Helmet>
        <title>Account Settings - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto bg-[#1e293b] p-6 rounded-xl shadow space-y-4">
          <h1 className="text-2xl font-bold">Account Settings</h1>

          {loading ? (
            <p className="text-yellow-400">Loading...</p>
          ) : (
            <>
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
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                >
                  Save Changes
                </button>

                <button
                  onClick={handleEmailVerify}
                  disabled={verifying}
                  className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700"
                >
                  {verifying ? 'Sending...' : 'Verify Email'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}