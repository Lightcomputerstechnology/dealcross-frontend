// File: src/components/NotificationPopUp.jsx
import React, { useEffect, useState } from 'react';
import { useNotification } from '@/context/NotificationContext';
import { FiCheckCircle, FiXCircle, FiInfo, FiX } from 'react-icons/fi';

const NotificationPopUp = () => {
  const { notificationQueue, popNotification } = useNotification();
  const [current, setCurrent] = useState(null);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    if (notificationQueue.length && !current) {
      const next = notificationQueue[0];
      setCurrent(next);
      playSound(next.type);

      const timeout = setTimeout(() => {
        setCurrent(null);
        popNotification();
      }, 4000);

      setTimerId(timeout);
    }

    return () => {
      if (timerId) clearTimeout(timerId);
    };
  }, [notificationQueue, current, popNotification]);

  const playSound = (type) => {
    const path = `/sounds/${type}.mp3`;
    const audio = new Audio(path);
    audio.play().catch((err) => console.warn('Audio failed', err));
  };

  const handleClose = () => {
    if (timerId) clearTimeout(timerId);
    setCurrent(null);
    popNotification();
  };

  if (!current) return null;

  const { type, message } = current;
  const iconMap = {
    success: <FiCheckCircle className="text-green-500" />,
    error: <FiXCircle className="text-red-500" />,
    info: <FiInfo className="text-blue-500" />,
  };

  return (
    <div className="fixed bottom-6 right-6 bg-[#1e293b] border border-gray-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 z-50 animate-fade-in">
      {iconMap[type] || iconMap.info}
      <span className="text-sm flex-1">{message}</span>
      <button
        onClick={handleClose}
        className="ml-2 text-white hover:text-red-400 transition"
        title="Dismiss"
      >
        <FiX />
      </button>
    </div>
  );
};

export default NotificationPopUp;