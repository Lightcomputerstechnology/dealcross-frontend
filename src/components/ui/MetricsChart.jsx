// File: src/components/ui/MetricsChart.jsx

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { FiBarChart2 } from 'react-icons/fi';

const sampleData = [
  { name: 'Jan', deals: 20, funded: 1500 },
  { name: 'Feb', deals: 35, funded: 3000 },
  { name: 'Mar', deals: 50, funded: 4500 },
  { name: 'Apr', deals: 42, funded: 3800 },
];

const MetricsChart = ({ data = sampleData, title = 'Platform Activity (Monthly)' }) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow text-white animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <FiBarChart2 className="text-blue-400" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Legend />
          <Bar dataKey="deals" fill="#38bdf8" name="Deals Created" />
          <Bar dataKey="funded" fill="#34d399" name="Wallet Funded ($)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MetricsChart;
