// File: src/pages/admin/MetricsDashboard.jsx

import React, { useEffect, useState } from 'react';
import { getAdminMetrics } from '@/api';
import MetricsCard from '@/components/MetricsCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from 'react-hot-toast';

const MetricsDashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const data = await getAdminMetrics();
      if (Array.isArray(data)) {
        setMetrics(data);
      } else {
        toast.error('Invalid metrics format.');
      }
    } catch (err) {
      toast.error(err.message || 'Failed to load metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Metrics Dashboard</h2>

      {loading ? (
        <LoadingSpinner size={48} fullPage={false} />
      ) : metrics.length === 0 ? (
        <p className="text-gray-400 text-sm">No metrics available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {metrics.map((item, index) => (
            <MetricsCard
              key={index}
              type={item.type}
              value={item.value}
              timestamp={item.timestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricsDashboard;