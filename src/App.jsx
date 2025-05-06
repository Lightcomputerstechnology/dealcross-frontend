// File: src/App.jsx
import React from 'react';
import AppRoutes from './AppRoutes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import FloatingChatButtons from './components/FloatingChatButtons.jsx';

function App() {
  return (
    <HelmetProvider>
      <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <AppRoutes />

        <FloatingChatButtons />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded',
          }}
        />
      </div>
    </HelmetProvider>
  );
}

export default App;
import React from 'react';
import AppRoutes from './AppRoutes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { useUser } from './context/UserContext.jsx';
import FloatingChatButtons from './components/FloatingChatButtons.jsx';
import Loader from './components/Loader.jsx'; // ✅ Import Spinner

function App() {
  const { loading } = useUser(); // ✅ Pull loading state from context

  return (
    <HelmetProvider>
      <NotificationProvider>
        <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
          {loading ? (
            <Loader /> // ✅ Show spinner if loading
          ) : (
            <>
              <AppRoutes />
              <FloatingChatButtons />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  className: 'bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded',
                }}
              />
            </>
          )}
        </div>
      </NotificationProvider>
    </HelmetProvider>
  );
}

export default App;