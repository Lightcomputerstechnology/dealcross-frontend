// File: src/components/DealChat.jsx

import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import API from '@/api';

const DealChat = ({ dealId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const chatEndRef = useRef(null);

  // Load chat messages
  const fetchMessages = async () => {
    try {
      const res = await API.get(`/deals/${dealId}/chat`);
      setMessages(res);
    } catch (err) {
      toast.error('Failed to load chat messages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [dealId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await API.post(`/deals/${dealId}/chat`, {
        message: newMessage,
      });

      setMessages((prev) => [...prev, res]);
      setNewMessage('');
    } catch (err) {
      toast.error(err.message || 'Failed to send message.');
    }
  };

  return (
    <div className="w-full h-[400px] bg-gray-100 dark:bg-gray-800 border rounded-lg flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">Loading chat...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-xs md:max-w-md p-3 rounded-lg text-sm ${
                msg.sender === 'buyer'
                  ? 'ml-auto bg-blue-600 text-white'
                  : 'mr-auto bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {msg.text}
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex border-t p-2 bg-white dark:bg-gray-900">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-r-md"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default DealChat;