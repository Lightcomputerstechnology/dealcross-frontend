// File: src/pages/ChatSupport.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FiSend } from 'react-icons/fi';

const ChatSupport = () => {
  const { dealId } = useParams(); // expects route like /deals/:dealId/chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  const fetchMessages = async () => {
    try {
      const res = await axios.get(`https://d-final.onrender.com/deals/${dealId}/chat`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data || []);
    } catch (err) {
      console.error('Error fetching chat messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      sender_id: 1, // TEMP: replace with real user ID if needed
      text: input.trim()
    };

    try {
      await axios.post(
        `https://d-final.onrender.com/deals/${dealId}/chat`,
        newMessage,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInput('');
      fetchMessages(); // re-fetch to show latest
    } catch (err) {
      console.error('Send failed:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 10000);
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
        <h2 className="text-2xl font-bold mb-4">Chat with Partner (Deal ID: {dealId})</h2>

        <div className="flex-1 overflow-y-auto bg-[#1e293b] rounded-lg p-4 mb-4 shadow-md">
          {loading ? (
            <p className="text-yellow-400">Loading chat...</p>
          ) : messages.length === 0 ? (
            <p className="text-gray-400">No messages yet.</p>
          ) : (
            messages.map((msg, i) => (
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
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="flex gap-3">
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
