// File: src/context/NotificationContext.jsx

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

// Create Notification Context
const NotificationContext = createContext();

// Notification Provider
export const NotificationProvider = ({ children }) => {
  const [notificationQueue, setNotificationQueue] = useState([]);

  // Add notification to the queue
  const addNotification = useCallback((type, message, duration = 5000) => {
    const newNotification = {
      id: Date.now(),
      type,
      message,
      visible: true,
      duration,
    };

    setNotificationQueue((prev) => [...prev, newNotification]);

    // Remove after duration
    setTimeout(() => {
      removeNotification(newNotification.id);
    }, duration);
  }, []);

  // Remove notification by ID
  const removeNotification = useCallback((id) => {
    setNotificationQueue((prev) =>
      prev.filter((n) => n.id !== id)
    );
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notificationQueue, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// Hook to use notification context
export const useNotification = () => useContext(NotificationContext);
