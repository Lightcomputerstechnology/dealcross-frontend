import React, { useState, useEffect } from 'react';
import { FaCommentDots, FaHandshake, FaTimes } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

export default function FloatingChatButtons({ isLoggedIn, isPaired }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showButtons, setShowButtons] = useState(true);
  const [showSupport, setShowSupport] = useState(false);

  // Auto-hide buttons after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  if (location.pathname === '/404' || location.pathname.includes('not-found')) return null;

  const handleDealChat = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (!isPaired) {
      alert('Please pair with a deal partner to start chat.');
    } else {
      navigate('/dealchat');
    }
  };

  const handleSupportChat = () => {
    setShowSupport(true);
    setShowButtons(false);
  };

  return (
    <>
      {/* Smart Support Popup */}
      {showSupport && (
        <div className="fixed bottom-20 right-4 z-50 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg w-72 p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Chat Support</p>
            <button onClick={() => setShowSupport(false)} className="text-red-500 hover:text-red-700">
              <FaTimes />
            </button>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Support is currently offline. Leave your message.
          </p>
          <textarea
            className="w-full border dark:border-gray-700 rounded-md p-2 text-sm dark:bg-gray-900"
            rows="3"
            placeholder="Type your message here..."
          />
          <button className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 text-sm">
            Send
          </button>
        </div>
      )}

      {/* Floating Buttons */}
      {showButtons && !showSupport && (
        <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
          <button
            onClick={handleDealChat}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all"
            title="Deal Chat"
          >
            <FaHandshake />
          </button>
          <button
            onClick={handleSupportChat}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
            title="Support Chat"
          >
            <FaCommentDots />
          </button>
        </div>
      )}

      {/* Reopen Handle */}
      {!showButtons && !showSupport && (
        <div
          onClick={() => setShowButtons(true)}
          className="fixed bottom-4 right-4 bg-gray-700 hover:bg-gray-800 text-white text-xs px-3 py-2 rounded-full cursor-pointer z-50 shadow-lg"
          title="Show Chat Buttons"
        >
          Chat Options
        </div>
      )}
    </>
  );
}