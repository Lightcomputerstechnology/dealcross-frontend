// File: src/pages/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center">
        <p>Loading user profile...</p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>User Profile - Dealcross</title>
        <meta name="description" content="View and manage your Dealcross profile." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="max-w-3xl mx-auto bg-[#1e293b] p-6 rounded-lg shadow-md">
          {/* Avatar + Basic Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.username}</h2>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-green-600 rounded-full">
                Verified User
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-4 text-sm">
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Email:</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Role:</span>
              <span className="capitalize">{user.role}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Joined:</span>
              <span>{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="mt-6 text-right">
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;