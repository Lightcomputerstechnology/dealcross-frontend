// File: src/components/FloatingChatButton.jsx

import React, { useState, useEffect } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const FloatingChatButton = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [buttonActive, setButtonActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (location.pathname === '/404' || location.pathname.includes('not-found')) return null;

  const closeButton = () => {
    setVisible(false);
    setButtonActive(true);
  };

  const toggleButton = () => {
    setVisible(true);
    setButtonActive(false);
  };

  return (
    <>
      {/* Main Button - Close */}
      {visible && (
        <div
          className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
          onClick={closeButton}
          title="Close"
        >
          <FaTimes className="text-lg" />
        </div>
      )}

      {/* Mini Icon - Reopen */}
      {!visible && buttonActive && (
        <div
          className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
          onClick={toggleButton}
          title="Open Chat"
        >
          <FaCommentDots className="text-lg" />
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;