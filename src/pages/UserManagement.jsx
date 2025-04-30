import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiUsers, FiUserCheck, FiUserX, FiRefreshCw } from 'react-icons/fi';
import { getAllUsers, banUser, unbanUser } from '@/api';  // <— API integration
import { toast } from 'react-hot-toast';
import { useRequireAdmin } from '@/context/UserContext';

const UserManagement = () => {
  useRequireAdmin(); // Protect page for admins

  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('Loading users...');
  const [refreshing, setRefreshing] = useState(false);

  const fetchUsers = async () => {
    setRefreshing(true);
    try {
      const data = await getAllUsers();  // calls backend
      if (!data || data.length === 0) {
        setStatus('No users found.');
      } else {
        setUsers(data);
        setStatus(null);
      }
    } catch {
      setStatus('Failed to load users.');
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBan = async (id) => {
    try {
      await banUser(id);               // calls backend
      toast.success('User banned successfully.');
      fetchUsers();
    } catch (err) {
      toast.error(err.message || 'Failed to ban user.');
    }
  };

  const handleUnban = async (id) => {
    try {
      await unbanUser(id);             // calls backend
      toast.success('User unbanned successfully.');
      fetchUsers();
    } catch (err) {
      toast.error(err.message || 'Failed to unban user.');
    }
  };

  return (
    <>
      <Helmet>
        <title>User Management - Dealcross Admin</title>
        <meta name="description" content="Admin view of all registered users on Dealcross platform." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <FiUsers className="text-blue-500 text-2xl" />
            <h2 className="text-2xl font-bold">User Management (Admin)</h2>
          </div>
          <button
            onClick={fetchUsers}
            disabled={refreshing}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-200 text-sm transition"
          >
            <FiRefreshCw className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {status && <p className="text-yellow-400 mb-4 font-medium">{status}</p>}

        {users.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-[#1e293b] rounded-lg overflow-hidden">
              <thead>
                <tr className="text-left border-b border-gray-700 text-sm text-gray-400">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={i} className="border-t border-gray-800 text-sm hover:bg-gray-800">
                    <td className="px-4 py-2">{u.name || 'N/A'}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 capitalize">{u.role}</td>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {u.status === 'banned' ? (
                        <>
                          <FiUserX className="text-red-400" />
                          <span className="text-red-400">Banned</span>
                        </>
                      ) : (
                        <>
                          <FiUserCheck className="text-green-400" />
                          <span className="text-green-400">Active</span>
                        </>
                      )}
                    </td>
                    <td className="px-4 py-2 flex gap-2">
                      {u.status === 'banned' ? (
                        <button
                          onClick={() => handleUnban(u.id)}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-md"
                        >
                          Unban
                        </button>
                      ) : (
                        <button
                          onClick={() => handleBan(u.id)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-md"
                        >
                          Ban
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserManagement;