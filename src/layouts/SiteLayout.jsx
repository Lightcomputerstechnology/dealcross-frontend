// File: src/layouts/SiteLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingChatButtons from '@/components/FloatingChatButtons';
import NotificationAlert from '@/components/common/NotificationAlert';
import NotificationPopUp from '@/components/common/NotificationPopUp';

const SiteLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingChatButtons />
      <NotificationAlert />
      <NotificationPopUp />
    </div>
  );
};

export default SiteLayout;