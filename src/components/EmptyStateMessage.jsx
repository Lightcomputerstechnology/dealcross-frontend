// File: src/components/EmptyStateMessage.jsx

import React from 'react';

const EmptyStateMessage = ({ message = "No data available." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center text-gray-400 dark:text-gray-500 animate-fade-in">
      <svg
        className="w-16 h-16 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 13h6m2 7H7a2 2 0 01-2-2V6a2 2 0 012-2h3l2-2h2l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2z"
        />
      </svg>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default EmptyStateMessage;