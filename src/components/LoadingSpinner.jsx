// File: src/components/LoadingSpinner.jsx

import React from 'react';

const LoadingSpinner = ({ size = 16, fullPage = true }) => {
  return (
    <div
      className={`${
        fullPage ? 'min-h-screen' : 'h-32'
      } flex items-center justify-center bg-gray-100 dark:bg-gray-950`}
      role="status"
      aria-label="Loading spinner"
    >
      <div
        className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500"
        style={{ height: `${size}px`, width: `${size}px` }}
      />
    </div>
  );
};

export default LoadingSpinner;