// File: src/components/ui/MetricsCard.jsx

import React from 'react';
import classNames from 'classnames';

const MetricsCard = ({
  type = 'Metric',
  value = 0,
  timestamp = new Date(),
  color = 'blue',
  className = '',
}) => {
  const colorMap = {
    blue: 'text-blue-400 border-blue-600',
    green: 'text-green-400 border-green-600',
    red: 'text-red-400 border-red-600',
    yellow: 'text-yellow-300 border-yellow-500',
    indigo: 'text-indigo-400 border-indigo-600',
  };

  return (
    <div
      className={classNames(
        'bg-gray-800 p-4 rounded-lg shadow text-center border-l-4 animate-fade-in',
        colorMap[color] || colorMap.blue,
        className
      )}
    >
      <p className="text-sm uppercase tracking-wide text-gray-400">{type}</p>
      <h3 className="text-3xl font-bold mt-1">{value}</h3>
      <p className="text-xs text-gray-500">
        {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  );
};

export default MetricsCard;
