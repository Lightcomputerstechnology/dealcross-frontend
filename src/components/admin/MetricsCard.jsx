import React from 'react';
import CountUp from 'react-countup';

const MetricsCard = ({ title, value, icon: Icon, color = 'bg-blue-600', loading = false }) => {
  return (
    <div className={`flex items-center gap-4 p-5 rounded-2xl shadow-md text-white ${color}`}>
      <div className="text-3xl p-3 bg-white/20 rounded-full">
        <Icon className="text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm uppercase font-medium opacity-80">{title}</p>
        <h2 className="text-2xl font-bold mt-1">
          {loading ? (
            <span className="animate-pulse text-gray-300">Loading...</span>
          ) : (
            <CountUp end={value} duration={1.5} separator="," prefix={title === 'Revenue' ? '$' : ''} />
          )}
        </h2>
      </div>
    </div>
  );
};

export default MetricsCard;