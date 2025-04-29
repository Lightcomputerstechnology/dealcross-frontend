// File: src/components/NotificationAlert.jsx

import React, { useEffect, useState } from 'react';
import { FiCheckCircle, FiXCircle, FiX } from 'react-icons/fi';
import { useNotification } from '@/context/NotificationContext';

const NotificationAlert = () => {
  const { notificationQueue, popNotification } = useNotification();
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);

  // Preload audio files once
  useEffect(() => {
    const successSound = new Audio('/src/assets/sounds/success.mp3');
    const errorSound = new Audio('/src/assets/sounds/error.mp3');
    successSound.load();
    errorSound.load();
  }, []);

  // Play sound on show
  const playSound = (type) => {
    const sound = new Audio(
      type === 'success'
        ? '/src/assets/sounds/success.mp3'
        : '/src/assets/sounds/error.mp3'
    );
    sound.volume = 0.6;
    sound.play().catch(() => {});
  };

  // Show and auto-dismiss logic
  useEffect(() => {
    if (!visible && notificationQueue.length > 0) {
      const next = notificationQueue[0];
      setCurrent(next);
      setVisible(true);
      playSound(next.type);

      const timer = setTimeout(() => {
        setVisible(false);
        popNotification();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [notificationQueue, visible, popNotification]);

  if (!visible || !current) return null;

  const isSuccess = current.type === 'success';

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed top-5 right-5 z-50 flex items-center justify-between gap-3 p-4 text-sm rounded-lg shadow-lg 
      animate-slideInFromRight transition-all duration-300 max-w-sm
      ${isSuccess
        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}
    >
      <div className="flex items-center">
        {isSuccess ? (
          <FiCheckCircle className="w-5 h-5 mr-2" />
        ) : (
          <FiXCircle className="w-5 h-5 mr-2" />
        )}
        <span className="font-medium">{current.message}</span>
      </div>
      <button
        onClick={() => {
          setVisible(false);
          popNotification();
        }}
        aria-label="Dismiss notification"
        className="hover:opacity-60 transition"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NotificationAlert;