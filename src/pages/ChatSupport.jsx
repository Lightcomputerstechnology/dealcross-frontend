// File: src/pages/ChatSupport.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { FiSend } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  getDealMessages,
  sendDealMessage,
  markDealChatAsRead,
} from '@/api';

const ChatSupport = () => {
  const { dealId } = useParams(); // Assumes route is /chat/:dealId
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const data = await getDealMessages(dealId);
      setMessages(data || []);
    } catch (err) {
      toast.error('Failed to load messages.');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await sendDealMessage(dealId, input.trim());
      setInput('');
      fetchMessages();
    } catch (err) {
      toast.error('Failed to send message.');
    }
  };

  useEffect(() => {
    fetchMessages();
    markDealChatAsRead(dealId);
    const interval = setInterval(fetchMessages, 15000);
    return () => clearInterval(interval);
  }, [dealId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Helmet>
        <title>Deal Chat - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Chat for Deal #{dealId}</h2>

        <div className="flex-1 overflow-y-auto bg-[#1e293b] rounded-lg p-4 mb-4 shadow-md">
          {loading ? (
            <p className="text-yellow-400">Loading chat...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-400">No messages yet for this deal.</p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-3 flex flex-col ${
                  msg.is_sender ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-xs ${
                    msg.is_sender ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 rounded bg-gray-800 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded font-medium flex items-center gap-2"
          >
            <FiSend /> Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatSupport;
