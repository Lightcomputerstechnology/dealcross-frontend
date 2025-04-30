// File: src/App.jsx

import React from 'react';
import AppRoutes from './AppRoutes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingChatButton from './components/FloatingChatButton.jsx'; // ✅ Add this line

function App() {
  return (
    <HelmetProvider>
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
        <Navbar />
        
        {/* Main Page Content */}
        <div className="flex-grow">
          <AppRoutes />
        </div>

        <Footer />

        {/* Floating Chat Icon Across All Pages */}
        <FloatingChatButton /> {/* ✅ Globally mounted */}

        {/* Toast Notifications */}
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </div>
    </HelmetProvider>
  );
}

export default App;
