import React, { useEffect, useState } from 'react';
import MetricsCard from '@/components/admin/MetricsCard';
import { FiUsers, FiDollarSign, FiBriefcase } from 'react-icons/fi';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';

const AdminMetricsGrid = () => {
  const [metrics, setMetrics] = useState({
    users: 0,
    revenue: 0,
    activeDeals: 0,
  });

  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/metrics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMetrics(res.data);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to load metrics.');
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-[#0f172a] text-white">
      <Helmet>
        <title>Admin Metrics - Dealcross</title>
      </Helmet>

      <h2 className="text-3xl font-bold mb-6 text-center">Platform Metrics Overview</h2>

      <div className="grid gap-6 md:grid-cols-3">
        <MetricsCard title="Total Users" value={metrics.users} icon={FiUsers} color="bg-indigo-600" />
        <MetricsCard title="Revenue" value={`$${metrics.revenue}`} icon={FiDollarSign} color="bg-green-600" />
        <MetricsCard title="Active Deals" value={metrics.activeDeals} icon={FiBriefcase} color="bg-yellow-600" />
      </div>
    </div>
  );
};

export default AdminMetricsGrid;