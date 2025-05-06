import React, { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      {darkMode ? (
        <FiSun className="text-yellow-400 text-xl" />
      ) : (
        <FiMoon className="text-white text-xl" />
      )}
    </button>
  );
};

export default ThemeToggle;
