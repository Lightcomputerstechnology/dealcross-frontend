// File: src/App.jsx
import React from 'react';
import AppRoutes from './AppRoutes.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import { useUser } from './context/UserContext.jsx';
import FloatingChatButtons from './components/FloatingChatButtons.jsx';
import Loader from './components/Loader.jsx'; // ✅ Spinner for loading state

function App() {
  const { loading } = useUser(); // ✅ Get loading state

  return (
    <HelmetProvider>
      <div className="relative min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-300">
        {loading ? (
          <Loader />
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
    </HelmetProvider>
  );
}

export default App;