// File: src/App.jsx

import React from 'react';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-white min-h-screen">
      <AppRoutes />
    </div>
  );
}