// File: src/components/admin/UserControlList.jsx

import React, { useEffect, useState } from 'react';
import { getAllUsers, banUser, unbanUser } from '@/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import EmptyStateMessage from '@/components/EmptyStateMessage';

const UserControlList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await getAllUsers();
      setUsers(res || []);
    } catch {
      toast.error('Failed to load users.');
    } finally {
      setLoading(false);
    }
  };

  const handleBanToggle = async (user) => {
    const action = user.is_banned ? 'Unban' : 'Ban';
    const confirm = window.confirm(`Are you sure you want to ${action.toLowerCase()} ${user.username}?`);
    if (!confirm) return;

    try {
      if (user.is_banned) {
        await unbanUser(user.id);
        toast.success('User unbanned.');
      } else {
        await banUser(user.id, 'Admin action');
        toast.success('User banned.');
      }
      fetchUsers();
    } catch {
      toast.error(`${action} failed.`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtered result based on query
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(query.toLowerCase()) ||
    user.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow mt-8 animate-fade-in">
      <h3 className="font-semibold text-white text-lg mb-4">User Controls</h3>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by username or email..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full mb-4 px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
      />

      {loading ? (
        <LoadingSpinner size={28} fullPage={false} />
      ) : filteredUsers.length === 0 ? (
        <EmptyStateMessage message="No matching users found." />
      ) : (
        <ul className="space-y-3 text-sm">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="flex flex-col md:flex-row justify-between md:items-center text-gray-300 border-b border-gray-700 pb-2"
            >
              <div>
                <span className="font-medium">{user.username}</span> ({user.email})
                {user.role && user.role !== 'user' && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-blue-600 rounded text-white">
                    {user.role.toUpperCase()}
                  </span>
                )}
                <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                  user.is_banned ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                }`}>
                  {user.is_banned ? 'BANNED' : 'ACTIVE'}
                </span>
              </div>
              <button
                onClick={() => handleBanToggle(user)}
                className={`mt-2 md:mt-0 px-3 py-1 rounded text-white transition ${
                  user.is_banned ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {user.is_banned ? 'Unban' : 'Ban'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserControlList;