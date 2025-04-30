// File: src/pages/AIInsightCenter.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FiTrendingUp, FiShieldOff, FiPieChart, FiRefreshCw } from 'react-icons/fi';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const iconMapper = {
  'trending-up': <FiTrendingUp size={22} />,
  'shield-off': <FiShieldOff size={22} />,
  'pie-chart': <FiPieChart size={22} />,
};

const AIInsightCenter = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [filter, setFilter] = useState('All');

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://d-final.onrender.com/investor/insights', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInsights(response.data || []);
      setLastUpdated(new Date());
    } catch (err) {
      toast.error('Failed to load AI insights.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const filteredInsights =
    filter === 'All' ? insights : insights.filter((i) => i.category === filter);

  return (
    <>
      <Helmet>
        <title>AI Insight Center - Dealcross</title>
        <meta name="description" content="AI-generated insights for investor and admin decisions on Dealcross." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">AI Insight Center</h2>
          <button
            onClick={fetchInsights}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-500 transition"
          >
            <FiRefreshCw /> Refresh
          </button>
        </div>

        <div className="flex gap-3 mb-4 flex-wrap">
          {['All', 'Deals', 'Fraud', 'Shares'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3 py-1 rounded font-medium text-sm transition ${
                filter === cat ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {lastUpdated && (
          <p className="text-sm text-gray-400 mb-6">
            Last updated: {lastUpdated.toLocaleString()}
          </p>
        )}

        {loading ? (
          <p className="text-yellow-400 text-sm">Loading insights...</p>
        ) : filteredInsights.length === 0 ? (
          <p className="text-gray-400 text-sm">No insights available for this category.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInsights.map((item, index) => (
              <motion.div
                key={index}
                className="bg-[#1e293b] p-6 rounded-lg shadow-lg space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="text-blue-400">{iconMapper[item.icon]}</div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
                <p className="text-xs text-green-400">
                  Confidence: {item.confidence}%
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AIInsightCenter;
