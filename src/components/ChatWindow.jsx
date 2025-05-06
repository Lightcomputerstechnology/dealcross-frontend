import React from 'react';

const ChatWindow = ({ onClose }) => {
  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 max-w-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-4 animate-slide-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-gray-900 dark:text-white">Support Chat</h2>
        <button
          onClick={onClose}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500"
        >
          Close
        </button>
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">
        Welcome! How can we assist you?
      </div>
      <textarea
        rows="3"
        placeholder="Type your message..."
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-sm"
      />
      <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-semibold">
        Send
      </button>

      <style>{`
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default ChatWindow;