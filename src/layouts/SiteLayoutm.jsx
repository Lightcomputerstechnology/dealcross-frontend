// File: src/layouts/SiteLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Logo from '@/assets/images/dealcross-logo.png';
import SEOHead from '@/components/SEOHead';
import PromoBanner from '@/components/PromoBanner';
import BackToTopButton from '@/components/BackToTopButton';

const SiteLayout = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-300 overflow-x-hidden">
      {/* Watermark Background */}
      <img
        src={Logo}
        alt="Watermark"
        className="absolute inset-0 w-full h-full object-contain opacity-5 pointer-events-none z-0 select-none"
      />

      {/* Main Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <SEOHead />
        <PromoBanner />
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default SiteLayout;
