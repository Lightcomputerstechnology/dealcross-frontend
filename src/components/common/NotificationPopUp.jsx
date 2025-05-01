import React, { useEffect, useState } from 'react';
import { useNotification } from '@/context/NotificationContext';
import { FiCheckCircle, FiXCircle, FiInfo } from 'react-icons/fi';

const NotificationPopUp = () => {
  const { notificationQueue, popNotification } = useNotification();
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    if (!current && notificationQueue.length > 0) {
      const next = notificationQueue[0];
      setCurrent(next);
      popNotification();

      // Play sound based on type
      let soundPath = '/sounds/info.mp3';
      if (next.type === 'success') soundPath = '/sounds/success.mp3';
      else if (next.type === 'error') soundPath = '/sounds/error.mp3';
      new Audio(soundPath).play();

      // Auto-dismiss after 4 seconds
      const timeout = setTimeout(() => setCurrent(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [notificationQueue, current, popNotification]);

  if (!current) return null;

  const iconMap = {
    success: <FiCheckCircle className="text-green-400 text-2xl" />,
    error: <FiXCircle className="text-red-400 text-2xl" />,
    info: <FiInfo className="text-blue-400 text-2xl" />,
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-fade-in">
      {iconMap[current.type] || iconMap.info}
      <span className="text-sm">{current.message}</span>
    </div>
  );
};

export default NotificationPopUp;