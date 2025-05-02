// File: src/components/FloatingChatButton.jsx
import React, { useState, useEffect } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const FloatingChatButton = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [buttonActive, setButtonActive] = useState(true);

  // Hide on 404 page
  if (location.pathname === '/404' || location.pathname.includes('not-found')) return null;

  // Auto-hide after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const toggleChat = () => {
    setVisible(!visible);
    setButtonActive(true);
  };

  return (
    <>
      {/* Main Chat Button */}
      {visible && (
        <div
          className="fixed bottom-6 right-1/2 translate-x-1/2 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-500"
          onClick={() => setVisible(false)}
        >
          <FaTimes className="text-lg" />
        </div>
      )}

      {/* Toggle Icon (Appears when chat is hidden) */}
      {!visible && buttonActive && (
        <div
          className="fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl cursor-pointer animate-bounce"
          onClick={toggleChat}
          title="Open Chat"
        >
          <FaCommentDots className="text-lg" />
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;