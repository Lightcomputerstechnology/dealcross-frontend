// File: src/components/ui/NotificationAlert.jsx

import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

const colorMap = {
  success: 'bg-green-600 text-white border-green-400',
  error: 'bg-red-600 text-white border-red-400',
  info: 'bg-blue-600 text-white border-blue-400',
  warning: 'bg-yellow-500 text-black border-yellow-300',
};

const iconMap = {
  success: <FiCheckCircle className="mr-2" />,
  error: <FiXCircle className="mr-2" />,
  info: <FiInfo className="mr-2" />,
  warning: <FiAlertTriangle className="mr-2" />,
};

const NotificationAlert = ({
  type = 'info',
  message = '',
  onClose,
  duration = 4000,
  className = '',
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`w-full max-w-xl mx-auto px-4 py-3 mb-4 border rounded shadow transition-all duration-300 animate-fade-in ${colorMap[type]} ${className}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm font-medium">
          {iconMap[type]}
          <span>{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-lg font-bold hover:opacity-70 focus:outline-none"
            aria-label="Close notification"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default NotificationAlert;
