import React from 'react';
import { motion } from 'framer-motion';

const SecurityCenter = () => {
  const loginActivity = [
    { location: 'Aba, Nigeria', device: 'Chrome - Windows', time: 'Today, 09:23 AM', status: 'trusted' },
    { location: 'Lagos, Nigeria', device: 'Mobile Safari - iPhone', time: 'Yesterday, 06:45 PM', status: 'trusted' },
    { location: 'Unknown IP', device: 'Suspicious VPN', time: '2 days ago, 11:12 AM', status: 'suspicious' },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      trusted: 'bg-green-500',
      suspicious: 'bg-red-500',
    };
    return (
      <span className={`inline-block w-3 h-3 rounded-full ${styles[status] || 'bg-gray-500'}`}></span>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <motion.h2
        className="text-2xl font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Security Center
      </motion.h2>

      {/* 2FA Section */}
      <motion.div
        className="bg-[#1e293b] p-6 rounded-lg shadow-md mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className="text-lg font-semibold mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-gray-400 mb-4">
          Your account is <span className="text-green-400 font-semibold">protected</span> with 2FA.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-medium">
          Manage 2FA Settings
        </button>
      </motion.div>

      {/* Login Activity */}
      <motion.div
        className="bg-[#1e293b] p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold mb-4">Recent Login Activity</h3>
        <motion.ul
          className="space-y-4 text-sm"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {loginActivity.map((entry, index) => (
            <motion.li
              key={index}
              className="border-b border-gray-700 pb-2 flex justify-between items-center"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div>
                <p className="font-medium flex items-center gap-2">
                  {getStatusBadge(entry.status)} {entry.device}
                </p>
                <p className="text-gray-400">{entry.location}</p>
              </div>
              <p className="text-gray-400">{entry.time}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default SecurityCenter;