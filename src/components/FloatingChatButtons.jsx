import React, { useState, useEffect } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import ChatWindow from './ChatWindow';

const FloatingChatButton = () => {
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (location.pathname === '/404' || location.pathname.includes('not-found')) return null;

  const toggleChat = () => {
    setShowChat(!showChat);
    setVisible(false);
  };

  return (
    <>
      {showChat && <ChatWindow onClose={() => setShowChat(false)} />}

      {visible && !showChat && (
        <div
          className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
          onClick={() => setVisible(false)}
          title="Close"
        >
          <FaTimes className="text-lg" />
        </div>
      )}

      {!visible && !showChat && (
        <div
          className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
          onClick={toggleChat}
          title="Chat with Support"
        >
          <FaCommentDots className="text-lg" />
        </div>
      )}
    </>
  );
};

export default FloatingChatButton;