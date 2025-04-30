// File: src/components/admin/ChartsDashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';

const ChartsDashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchChartData = async () => {
    try {
      const res = await axios.get('https://d-final.onrender.com/admin/metrics');
      const transformed = (res.data || []).map((item) => ({
        label: item.type,
        value: item.value,
      }));
      setChartData(transformed);
    } catch (err) {
      console.error('Chart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChartData();
    const interval = setInterval(fetchChartData, 20000); // Auto-refresh every 20s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow text-white animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <FiBarChart2 className="text-blue-400" />
        <h3 className="text-lg font-semibold">System Metrics Overview</h3>
      </div>

      {loading ? (
        <p className="text-yellow-400">Loading chart data...</p>
      ) : chartData.length === 0 ? (
        <p className="text-gray-400 text-sm">No metrics available at the moment.</p>
      ) : (
        <>
          <div className="w-full h-[300px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="label" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="label" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#16a34a"
                  strokeWidth={2}
                  name="Metric"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default ChartsDashboard;
