// File: src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { getCurrentUser, updateProfile } from '@/api';
import { verifyEmail } from '@/api/optional';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

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
      localStorage.setItem('user', JSON.stringify({ ...updated }));
      toast.success('Profile updated.');
      setEditing(false);
    } catch (err) {
      toast.error(err.message || 'Update failed.');
    }
  };

  const handleEmailVerify = async () => {
    try {
      setVerifying(true);
      const result = await verifyEmail();
      toast.success(result?.message || 'Verification email sent!');
    } catch (err) {
      toast.error(err.message || 'Verification request failed.');
    } finally {
      setVerifying(false);
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
              <p className="flex items-center gap-2">
                <strong>Email:</strong> {profile?.email}
                {profile?.email_verified ? (
                  <span className="text-green-400 text-sm bg-green-900 px-2 py-0.5 rounded">
                    Verified
                  </span>
                ) : (
                  <span className="text-yellow-400 text-sm bg-yellow-900 px-2 py-0.5 rounded">
                    Unverified
                  </span>
                )}
              </p>

              {!profile?.email_verified && (
                <button
                  onClick={handleEmailVerify}
                  disabled={verifying}
                  className="mt-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded"
                >
                  {verifying ? 'Sending...' : 'Verify My Email'}
                </button>
              )}

              <button
                onClick={() => setEditing(true)}
                className="mt-6 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
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