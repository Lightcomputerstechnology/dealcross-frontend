// File: src/components/DealChatBox.jsx

import React, { useState, useEffect, useRef } from 'react';
import API from '@/api';
import { toast } from 'react-hot-toast';

const DealChatBox = ({ dealId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const loadMessages = async () => {
    try {
      const res = await API.get(`/deals/${dealId}/chat`);
      setMessages(res);
    } catch (err) {
      toast.error('Failed to load messages');
    }
  };

  useEffect(() => {
    loadMessages();
  }, [dealId]);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() && !attachment) return;

    const formData = new FormData();
    formData.append('message', input);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    setLoading(true);
    try {
      const res = await API.post(`/deals/${dealId}/chat`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessages((prev) => [...prev, res]);
      setInput('');
      setAttachment(null);
    } catch (err) {
      toast.error(err.message || 'Failed to send');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-4 w-full max-w-2xl mx-auto mt-4">
      <div className="h-64 overflow-y-auto border border-gray-300 dark:border-gray-700 rounded-md mb-4 p-2 space-y-2 bg-gray-50 dark:bg-gray-800">
        {messages.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">No messages yet.</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`p-2 rounded-md ${
                msg.sender === 'You' || msg.sender === 'buyer'
                  ? 'bg-blue-100 dark:bg-blue-600 text-right ml-12'
                  : 'bg-gray-200 dark:bg-gray-700 mr-12'
              }`}
            >
              <p className="text-sm font-semibold">{msg.sender}</p>
              <p className="text-sm">{msg.text}</p>
              {msg.attachment_url && (
                <a
                  href={msg.attachment_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 underline block mt-1"
                >
                  View Attachment
                </a>
              )}
              <span className="text-xs text-gray-500">{msg.time}</span>
            </div>
          ))
        )}
        <div ref={chatRef} />
      </div>

      {attachment && (
        <div className="mb-2 text-sm text-green-600 dark:text-green-400">
          Attached: {attachment.name}
        </div>
      )}

      <div className="flex items-center space-x-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none dark:bg-gray-800"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <input
          type="file"
          id="attachment"
          className="hidden"
          onChange={(e) => setAttachment(e.target.files[0])}
        />
        <label
          htmlFor="attachment"
          className="cursor-pointer text-gray-600 dark:text-gray-300 hover:text-blue-500"
        >
          📎
        </label>
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </div>
    </div>
  );
};

export default DealChatBox;