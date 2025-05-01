import React, { createContext, useContext, useState, useCallback } from 'react';

// Create the context
const NotificationContext = createContext();

// Custom hook for using the context
export const useNotification = () => useContext(NotificationContext);

// Provider component
export const NotificationProvider = ({ children }) => {
  const [notificationQueue, setNotificationQueue] = useState([]);

  const pushNotification = useCallback((message, type = 'info') => {
    setNotificationQueue((prev) => [...prev, { message, type }]);
  }, []);

  const popNotification = useCallback(() => {
    setNotificationQueue((prev) => prev.slice(1));
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notificationQueue,
        pushNotification,
        popNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};