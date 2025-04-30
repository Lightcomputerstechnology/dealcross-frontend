import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { FiSend } from 'react-icons/fi';
import axios from 'axios';

const ChatSupport = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchMessages();
    markAsRead();
  }, []);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://d-final.onrender.com/chat/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data || []);
    } catch (err) {
      console.error('Failed to load messages');
    }
  };

  const markAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://d-final.onrender.com/chat/mark-read', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.warn('Mark read failed');
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://d-final.onrender.com/chat/send', {
        text: input.trim(),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setInput('');
      fetchMessages();
    } catch (err) {
      console.error('Failed to send');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      <Helmet>
        <title>Chat Support - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white px-6 py-10 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Secure Deal Chat</h2>

        <div className="flex-1 overflow-y-auto bg-[#1e293b] rounded-lg p-4 mb-4 shadow-md">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 flex flex-col ${
                msg.sender === 'you' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.sender === 'you' ? 'bg-blue-600' : 'bg-gray-700'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
              </div>
              <p className="text-xs text-gray-400 mt-1">{msg.time}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-3">
          <input
            type="text"
            placeholder="Type message..."
            className="flex-1 px-4 py-2 rounded bg-gray-800 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded flex items-center gap-2">
            <FiSend /> Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatSupport;
