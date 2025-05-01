// File: src/layouts/SiteLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SiteLayout = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Debug Heading */}
      <div className="text-center py-4 text-2xl font-bold text-red-500">🔥 SITE LAYOUT LOADED 🔥</div>

      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default SiteLayout;