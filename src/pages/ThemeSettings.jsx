// File: src/pages/ThemeSettings.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

const ThemeSettings = () => {
  const [selectedTheme, setSelectedTheme] = useState('auto');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      setSelectedTheme(stored);
    } else {
      setSelectedTheme('auto');
    }
  }, []);

  const applyTheme = (theme) => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      // Auto mode: follow system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    }
  };

  const handleThemeChange = (e) => {
    const theme = e.target.value;
    setSelectedTheme(theme);
    applyTheme(theme);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <Helmet>
        <title>Theme Settings - Dealcross</title>
      </Helmet>

      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow rounded-lg p-8 mt-10 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6">Theme Settings</h2>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Choose Theme:</span>
            <select
              value={selectedTheme}
              onChange={handleThemeChange}
              className="mt-2 block w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none"
            >
              <option value="auto">Auto (Follow System)</option>
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
