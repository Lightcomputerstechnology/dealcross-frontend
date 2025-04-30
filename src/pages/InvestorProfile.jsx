// File: src/pages/InvestorProfile.jsx

import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';

const InvestorProfile = () => {
  const investor = {
    name: 'Sarah Thompson',
    email: 'sarah@investnow.com',
    trustLevel: 'Gold Tier',
    joined: 'May 10, 2023',
    totalValue: '$18,240.90',
    shares: [
      { company: 'Tesla', amount: '12 shares', value: '$7,800' },
      { company: 'Apple', amount: '20 shares', value: '$3,600' },
      { company: 'Amazon', amount: '10 shares', value: '$6,840' },
    ],
  };

  const trustBadgeColor = {
    'Gold Tier': 'bg-yellow-500 text-black',
    'Silver Tier': 'bg-gray-400 text-black',
    'Bronze Tier': 'bg-orange-400 text-black',
  }[investor.trustLevel] || 'bg-gray-600';

  return (
    <>
      <Helmet>
        <title>{investor.name}'s Profile - Dealcross</title>
        <meta name="description" content="View investor trust tier, portfolio balance, and active share holdings." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <motion.div
          className="max-w-3xl mx-auto bg-[#1e293b] p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold">
              {investor.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-semibold">{investor.name}</h2>
              <span className={`inline-block px-2 py-0.5 text-xs rounded ${trustBadgeColor}`}>
                {investor.trustLevel}
              </span>
            </div>
          </div>

          {/* Portfolio Info */}
          <div className="space-y-4 text-sm mb-6">
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Email:</span>
              <span>{investor.email}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Joined:</span>
              <span>{investor.joined}</span>
            </div>
            <div className="flex justify-between border-b border-gray-700 pb-2">
              <span className="text-gray-400">Total Portfolio:</span>
              <span className="font-bold text-green-400">{investor.totalValue}</span>
            </div>
          </div>

          {/* Shares */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Share Holdings</h3>
            <motion.div
              className="bg-gray-800 rounded-lg divide-y divide-gray-700"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
            >
              {investor.shares.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between p-4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <div>
                    <p className="font-medium">{item.company}</p>
                    <p className="text-xs text-gray-400">{item.amount}</p>
                  </div>
                  <p className="text-right font-semibold">{item.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Edit Button */}
          <div className="mt-6 text-right">
            <button className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-md font-medium">
              Edit Investor Info
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default InvestorProfile;