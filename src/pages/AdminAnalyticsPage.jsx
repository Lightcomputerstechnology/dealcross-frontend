// File: src/pages/AdminAnalyticsPage.jsx

import React from 'react';
import { Helmet } from 'react-helmet';
import { FiBarChart2 } from 'react-icons/fi';
import AdminCharts from '@/components/admin/AdminCharts';
import useAuthRedirect from '@/hooks/useAuthRedirect';

const AdminAnalyticsPage = () => {
  useAuthRedirect({ adminOnly: true }); // ✅ Strict admin access

  return (
    <>
      <Helmet>
        <title>Admin Analytics - Dealcross</title>
        <meta 
          name="description" 
          content="Track platform metrics, trends, and real-time insights on Dealcross admin analytics dashboard." 
        />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-4 md:px-8 py-10">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-6">
          <FiBarChart2 className="text-blue-500 w-6 h-6" />
          <h1 className="text-2xl font-bold">Admin Chart Analytics</h1>
        </div>

        {/* Chart Section */}
        <div className="bg-gray-900 p-6 rounded-2xl shadow-lg">
          <AdminCharts />
        </div>
      </div>
    </>
  );
};

export default AdminAnalyticsPage;
