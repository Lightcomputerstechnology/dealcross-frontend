// File: src/components/admin/AdminMetricsCard.jsx

import React, { useEffect, useState } from 'react';
import { FiUsers, FiTrendingUp, FiDollarSign, FiBriefcase } from 'react-icons/fi';
import MetricsCard from './MetricsCard';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminMetricsCard = () => {
  const [stats, setStats] = useState({
    total_users: 0,
    total_revenue: 0,
    active_deals: 0,
    kyc_pending: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/admin/metrics', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (err) {
      toast.error('Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricsCard
        title="Total Users"
        value={stats.total_users}
        icon={FiUsers}
        color="bg-indigo-600"
        loading={loading}
      />
      <MetricsCard
        title="Total Revenue"
        value={stats.total_revenue}
        icon={FiDollarSign}
        color="bg-green-600"
        loading={loading}
      />
      <MetricsCard
        title="Active Deals"
        value={stats.active_deals}
        icon={FiBriefcase}
        color="bg-blue-600"
        loading={loading}
      />
      <MetricsCard
        title="Pending KYC"
        value={stats.kyc_pending}
        icon={FiTrendingUp}
        color="bg-yellow-500"
        loading={loading}
      />
    </div>
  );
};

export default AdminMetricsCard;