// File: src/components/SiteLayout.jsx

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "@/assets/dealcross-logo.png";
import SEOHead from "@/components/SEOHead";
import PromoBanner from "@/components/PromoBanner";
import BackToTopButton from "@/components/BackToTopButton";

const SiteLayout = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-white dark:bg-gray-900 transition duration-300 overflow-hidden">
      {/* Global watermark background */}
      <img
        src={Logo}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain opacity-5 pointer-events-none z-0 select-none"
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        <SEOHead />
        <PromoBanner />
        <Navbar />
        <main className="flex-grow px-4 py-6 md:px-8">
          <Outlet />
        </main>
        <Footer />
        <BackToTopButton />
      </div>
    </div>
  );
};

export default SiteLayout;