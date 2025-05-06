import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600 border-opacity-50"></div>
      <span className="ml-4 text-lg font-medium">Loading, please wait...</span>
    </div>
  );
};

export default Loader;