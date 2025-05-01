// File: src/App.jsx

import React from 'react';
import AppRoutes from './AppRoutes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';

// Global Layout Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import FloatingChatButton from './components/FloatingChatButton.jsx';
import NotificationAlert from './components/NotificationAlert.jsx';
import NotificationPopUp from './components/NotificationPopUp.jsx';

// Context Providers
import { NotificationProvider } from './context/NotificationContext.jsx';

function App() {
  return (
    <HelmetProvider>
      <NotificationProvider>
        <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
          
          {/* Top Navigation */}
          <Navbar />

          {/* Main Application Routes */}
          <div className="flex-grow">
            <AppRoutes />
          </div>

          {/* Bottom Footer */}
          <Footer />

          {/* Global Overlays */}
          <FloatingChatButton />
          <NotificationAlert />
          <NotificationPopUp />

          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded',
            }}
          />
        </div>
      </NotificationProvider>
    </HelmetProvider>
  );
}

export default App;