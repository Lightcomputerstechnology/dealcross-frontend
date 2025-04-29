// File: src/components/DealChatRoom.jsx

import React, { useState, useEffect, useRef } from 'react';
import API from '@/api';
import { toast } from 'react-hot-toast';

const DealChatRoom = ({ dealId }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const chatRef = useRef(null);

  // Scroll to bottom
  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load user role
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserRole(user?.role || 'guest');
  }, []);

  // Load messages from backend
  const fetchMessages = async () => {
    try {
      const res = await API.get(`/deals/${dealId}/chat`);
      setMessages(res);
    } catch (err) {
      toast.error('Failed to load messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [dealId]);

  // Send new message
  const handleSend = async () => {
    if (!input.trim()) return;
    if (!userRole) return alert('User role not found.');

    try {
      const res = await API.post(`/deals/${dealId}/chat`, {
        message: input,
      });

      setMessages((prev) => [...prev, res]);
      setInput('');
    } catch (err) {
      toast.error(err.message || 'Failed to send message');
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow mt-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Chat with Counterparty (Deal #{dealId})
      </h3>

      <div className="h-64 overflow-y-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded p-3 space-y-3">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        ) : (
          messages.map((msg, idx) => {
            const isYou = msg.from === userRole;
            const alignment = isYou ? 'text-right' : 'text-left';
            const bubbleColor = isYou
              ? 'bg-blue-600 text-white'
              : msg.from === 'seller'
              ? 'bg-gray-700 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white';

            const label = isYou
              ? 'You'
              : msg.from.charAt(0).toUpperCase() + msg.from.slice(1);

            return (
              <div key={idx} className={`${alignment}`}>
                <div className={`inline-block px-4 py-2 rounded-md ${bubbleColor}`}>
                  <div className="text-xs font-medium mb-1">[{label}]</div>
                  <div className="text-sm">{msg.text}</div>
                </div>
              </div>
            );
          })
        )}
        <div ref={chatRef} />
      </div>

      <div className="flex mt-4 gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 focus:outline-none dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default DealChatRoom;