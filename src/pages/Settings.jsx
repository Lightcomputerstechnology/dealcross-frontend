import React, { useState } from 'react';

const Settings = () => {
  const [username, setUsername] = useState('john_doe');
  const [email, setEmail] = useState('john@example.com');
  const [notifications, setNotifications] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    console.log('Updated:', { username, email, notifications });
    // Future: send to backend
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

      <form
        onSubmit={handleSave}
        className="max-w-md mx-auto bg-[#1e293b] p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label className="block text-sm mb-1 text-gray-400">Username</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-gray-400">Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="accent-blue-500"
          />
          <label className="text-sm text-gray-300">Enable email notifications</label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded font-semibold"
        >
          Save Changes
        </button>

        <div className="mt-6 text-center">
          <button className="text-sm text-blue-400 hover:underline">
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;