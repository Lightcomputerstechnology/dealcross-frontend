import React, { useEffect, useRef, useState } from 'react';
import { FiX, FiSend } from 'react-icons/fi';
import { getChatMessages, sendMessage } from '@/api'; // ✅ your API methods

const ChatPopup = ({ visible, onClose, dealId }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!dealId) return;
    fetchMessages();
  }, [dealId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const data = await getChatMessages(dealId);
      setMessages(data);
    } catch (err) {
      console.error('Error loading messages:', err);
    }
  };

  const handleSend = async () => {
    if (!newMsg.trim()) return;
    const msg = newMsg.trim();
    setNewMsg('');
    setMessages([...messages, { sender: 'me', text: msg }]);
    await sendMessage(dealId, msg);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden flex flex-col animate-fade-in">
      <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
        <h3 className="font-semibold text-sm">Chat with Deal Partner</h3>
        <button onClick={onClose} className="hover:text-red-200">
          <FiX />
        </button>
      </div>

      <div className="flex-1 p-3 space-y-3 overflow-y-auto max-h-80 text-sm">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === 'me' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs ${
                msg.sender === 'me'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollRef} />
      </div>

      <div className="flex items-center border-t border-gray-300 dark:border-gray-700 px-3 py-2 bg-gray-50 dark:bg-gray-800">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-white"
        />
        <button
          onClick={handleSend}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
        >
          <FiSend />
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.25s ease-in;
        }
      `}</style>
    </div>
  );
};

export default ChatPopup;