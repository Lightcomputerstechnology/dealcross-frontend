// File: src/pages/LiveTradingChart.jsx

import React from 'react';

const mockData = [
  { label: 'Monday', value: 120 },
  { label: 'Tuesday', value: 180 },
  { label: 'Wednesday', value: 160 },
  { label: 'Thursday', value: 200 },
  { label: 'Friday', value: 150 },
];

const LiveTradingChart = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Live Trading Chart</h2>

      <div className="bg-[#1e293b] p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-5 gap-4 h-40 items-end">
          {mockData.map((point, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="bg-blue-500 w-6 rounded-t"
                style={{ height: `${point.value}px` }}
                title={`$${point.value}`}
              ></div>
              <p className="text-xs text-gray-300 mt-2">{point.label}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-6 text-center">
          * This is mock data. Live API integration coming soon.
        </p>
      </div>
    </div>
  );
};

export default LiveTradingChart;