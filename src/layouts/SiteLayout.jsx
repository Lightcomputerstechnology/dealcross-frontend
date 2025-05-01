// File: src/layouts/SiteLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
// …your other imports…
+ import Navbar from '@/components/Navbar';

const SiteLayout = () => (
  <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
-   <h1 className="text-4xl text-red-500">🔥 SITE LAYOUT LOADED 🔥</h1>
+   {/* Watermark, SEOHead, PromoBanner, etc. */}
+   <Navbar />

    <main className="flex-grow">
      <Outlet />
    </main>
  </div>
);

export default SiteLayout;