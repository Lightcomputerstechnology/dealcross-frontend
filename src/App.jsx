// File: src/App.jsx

import React from 'react';
import AppRoutes from './AppRoutes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from './context/NotificationContext.jsx';

function App() {
  return (
    <HelmetProvider>
      <NotificationProvider>
        {/* Entire layout and routes are handled in SiteLayout.jsx */}
        <AppRoutes />

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded',
          }}
        />
      </NotificationProvider>
    </HelmetProvider>
  );
}

export default App;