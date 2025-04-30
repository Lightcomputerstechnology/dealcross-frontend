// File: src/pages/WatermarkTest.jsx
import React from 'react';
import logo from '@/assets/dealcross-logo.png';

export default function WatermarkTest() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Watermark Background */}
      <div
        className="absolute inset-0 z-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${logo})`,
          backgroundSize: 'contain',
          opacity: 0.1,
          filter: 'grayscale(100%) contrast(90%) brightness(100%)',
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Dealcross Watermark Test
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
          If you can see the faint Dealcross logo behind, the watermark works perfectly across themes.
        </p>
      </div>
    </div>
  );
}