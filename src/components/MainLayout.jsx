// File: src/components/MainLayout.jsx

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ThemeToggle from './ThemeToggle';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0f172a] text-gray-900 dark:text-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow px-4 py-6 md:px-8 animate-fade-in">
        {children}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Theme Toggle */}
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default MainLayout;