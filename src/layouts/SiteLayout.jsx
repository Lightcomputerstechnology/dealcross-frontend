// File: src/layouts/SiteLayout.jsx import React from 'react'; import { Outlet } from 'react-router-dom'; import SEOHead from '@/components/SEOHead'; import PromoBanner from '@/components/PromoBanner'; import Navbar from '@/components/Navbar'; import Footer from '@/components/Footer'; import BackToTopButton from '@/components/BackToTopButton'; import Logo from '@/assets/images/dealcross-logo.png';

const SiteLayout = () => (

  <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition duration-300 overflow-x-hidden">
    {/* SEO Meta Tags */}
    <SEOHead />{/* Watermark Background */}
<div className="absolute inset-0 opacity-5 pointer-events-none z-0">
  <img
    src={Logo}
    alt="Dealcross Watermark"
    className="w-full h-full object-contain select-none"
  />
</div>

{/* Main Content Overlay */}
<div className="relative z-10 flex flex-col flex-1">
  {/* Top promotional banner */}
  <PromoBanner />

  {/* Navigation */}
  <Navbar />

  {/* Page content */}
  <main className="flex-grow p-4 md:p-8">
    <Outlet />
  </main>

  {/* Footer */}
  <Footer />

  {/* Back-to-top control */}
  <BackToTopButton />
</div>

  </div>
);export default SiteLayout;

