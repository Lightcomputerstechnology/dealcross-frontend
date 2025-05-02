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
      navigate('/deal-tracker'); // Adjust this route if needed
    }
  };

  const handleSupportChat = () => {
    navigate('/contact'); // Update to /support if support chat added
  };

  return (
    <>
      {/* Restore Anchor */}
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className="fixed bottom-5 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Open chat buttons"
        >
          <FiMessageSquare className="text-xl" />
        </button>
      )}

      {/* Floating Buttons */}
      {visible && (
        <div className="fixed bottom-5 z-50 flex justify-between items-center w-full px-6 pointer-events-none">
          {/* Support Button (Left) */}
          <button
            onClick={handleSupportChat}
            className="pointer-events-auto bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
          >
            <FiHelpCircle className="text-lg" /> Support
          </button>

          {/* Deal Chat Button (Right) */}
          <button
            onClick={() => {
              handleDealChat();
              setVisible(false); // collapse after use
            }}
            className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
          >
            <FiMessageSquare className="text-lg" /> Deal Chat
          </button>
        </div>
      )}
    </>
  );
};

export default FloatingChatButtons;