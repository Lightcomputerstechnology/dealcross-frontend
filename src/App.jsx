// File: src/App.jsx

import React from 'react';
import AppRoutes from './AppRoutes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from './context/NotificationContext.jsx';
import FloatingChatButtons from './components/FloatingChatButtons.jsx';

function App() {
  return (
    <HelmetProvider>
      <NotificationProvider>
        <div className="relative min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 ease-in-out">
          {/* All Routes */}
          <AppRoutes />

          {/* Floating Buttons */}
          <FloatingChatButtons />

          {/* Global Toasts */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg',
            }}
          />
        </div>
      </NotificationProvider>
    </HelmetProvider>
  );
}

export default App;
