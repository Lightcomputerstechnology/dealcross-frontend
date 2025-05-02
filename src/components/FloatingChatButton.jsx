// File: src/components/FloatingChatButtons.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiHelpCircle } from 'react-icons/fi';

const FloatingChatButtons = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  // Auto-hide after 15 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 15000);
    return () => clearTimeout(timer);
  }, []);

  const handleDealChat = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate('/deal-tracker'); // Adjust path if using custom chat route
    }
    setVisible(false);
  };

  const handleSupportChat = () => {
    navigate('/contact');
    setVisible(false);
  };

  return (
    <>
      {/* Restore Button */}
      {!visible && (
        <button
          onClick={() => setVisible(true)}
          className="fixed bottom-5 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
          aria-label="Open chat buttons"
        >
          <FiMessageSquare className="text-xl" />
        </button>
      )}

      {/* Floating Button Group */}
      {visible && (
        <div className="fixed bottom-5 z-50 flex justify-between items-center w-full px-6 pointer-events-none animate-slide-in">
          <button
            onClick={handleSupportChat}
            className="pointer-events-auto bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
          >
            <FiHelpCircle className="text-lg" /> Support
          </button>

          <button
            onClick={handleDealChat}
            className="pointer-events-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transition-all"
          >
            <FiMessageSquare className="text-lg" /> Deal Chat
          </button>
        </div>
      )}

      {/* Animation */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(80px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slideIn 0.4s ease-out;
        }
      `}</style>
    </>
  );
};

export default FloatingChatButtons;