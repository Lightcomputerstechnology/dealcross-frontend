// File: src/components/LoadingScreen.jsx
import React from 'react';

export default function LoadingScreen({ label = 'Loading…' }) {
  return (
    <div className="flex justify-center items-center h-screen">
      <span className="text-gray-600 dark:text-gray-300 text-lg">{label}</span>
    </div>
  );
}
