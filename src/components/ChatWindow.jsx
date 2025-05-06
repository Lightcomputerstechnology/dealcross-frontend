import React, { useState } from 'react';
import axios from 'axios';

const ChatWindow = ({ onClose }) => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://d-final.onrender.com/chat', { message }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStatus('Message sent!');
      setMessage('');
    } catch (err) {
      setStatus('Error sending message');
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-4 animate-slide-in">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-gray-900 dark:text-white">Support Chat</h2>
        <button onClick={onClose} className="text-sm text-gray-600 dark:text-gray-300 hover:text-red-500">Close</button>
      </div>

      <textarea
        rows="3"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800 text-sm"
      />

      <button
        onClick={sendMessage}
        className="mt-3 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-semibold"
      >
        Send
      </button>

      {status && <p className="text-xs mt-2 text-center text-gray-500 dark:text-gray-400">{status}</p>}
    </div>
  );
};

export default ChatWindow;