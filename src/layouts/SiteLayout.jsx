// File: src/layouts/SiteLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';

import SEOHead          from '@/components/SEOHead';
import PromoBanner      from '@/components/PromoBanner';
import Navbar           from '@/components/Navbar';
import Footer           from '@/components/Footer';
import BackToTopButton  from '@/components/BackToTopButton';
import Logo             from '@/assets/images/dealcross-logo.png';

const SiteLayout = () => (
  <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-x-hidden">
    {/* Watermark Background */}
    <img
      src={Logo}
      alt="Watermark"
      className="absolute inset-0 w-full h-full object-contain opacity-5 pointer-events-none select-none"
    />

    {/* Main Overlay */}
    <div className="relative z-10 flex flex-col flex-1">
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

export default SiteLayout;