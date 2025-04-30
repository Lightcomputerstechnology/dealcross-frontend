// File: src/components/admin/AdminMetricsChart.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { FiTrendingUp } from 'react-icons/fi';

const AdminMetricsChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChartMetrics = async () => {
    try {
      const response = await axios.get('https://d-final.onrender.com/admin/metrics/chart');
      setData(response.data || []);
    } catch (err) {
      console.error('Failed to load chart data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartMetrics();
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-md text-white animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <FiTrendingUp className="text-blue-400" />
        <h3 className="text-lg font-semibold">Weekly Activity Overview</h3>
      </div>

      {loading ? (
        <p className="text-sm text-yellow-400">Loading chart...</p>
      ) : data.length === 0 ? (
        <p className="text-sm text-gray-400">No metrics data found.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="day" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="deals" stroke="#4fd1c5" strokeWidth={2} name="Deals" />
            <Line type="monotone" dataKey="users" stroke="#63b3ed" strokeWidth={2} name="Users" />
            <Line type="monotone" dataKey="frauds" stroke="#f56565" strokeWidth={2} name="Fraud Alerts" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default AdminMetricsChart;
