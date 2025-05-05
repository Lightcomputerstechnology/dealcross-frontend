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
        {/*  ❌ removed bg-white  ⮕  ✅ default dark, optional light  */}
        <div className="relative min-h-screen bg-gray-950 light:bg-white text-gray-100 light:text-gray-900 transition-colors duration-300">
          <AppRoutes />

          {/* Floating global buttons */}
          <FloatingChatButtons />

          {/* Toasts */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              className: 'bg-gray-900 light:bg-white text-white light:text-black shadow-lg rounded',
            }}
          />
        </div>
      </NotificationProvider>
    </HelmetProvider>
  );
}

export default App;