// File: src/components/FloatingChatButtons.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiHelpCircle } from 'react-icons/fi';

const FloatingChatButtons = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  const handleDealChat = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate('/deal-tracker'); // or chat component if deal active
    }
  };

  const handleSupportChat = () => {
    navigate('/contact'); // can later replace with real chat or popup
  };

  return (
    <>
      {/* Toggle Anchor */}
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className="fixed bottom-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
        >
          <FiMessageSquare className="text-lg" />
        </button>
      )}

      {/* Floating Buttons Group */}
      {visible && (
        <div className="fixed bottom-4 z-50 flex justify-between w-full px-6 pointer-events-none">
          {/* Support Chat (Left) */}
          <button
            onClick={handleSupportChat}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 pointer-events-auto"
          >
            <FiHelpCircle /> Support
          </button>

          {/* Deal Chat (Right) */}
          <button
            onClick={() => {
              handleDealChat();
              setVisible(false); // auto-collapse
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 pointer-events-auto"
          >
            <FiMessageSquare /> Deal Chat
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingChatButtons;