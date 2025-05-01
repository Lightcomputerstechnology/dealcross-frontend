// File: src/layouts/SiteLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import PromoBanner from '@/components/PromoBanner';
import BackToTopButton from '@/components/BackToTopButton';

const SiteLayout = () => (
  <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
    <SEOHead />
    <PromoBanner />
    <Navbar />

    <main className="flex-grow p-4">
      <Outlet />
    </main>

    <Footer />
    <BackToTopButton />
  </div>
);

export default SiteLayout;