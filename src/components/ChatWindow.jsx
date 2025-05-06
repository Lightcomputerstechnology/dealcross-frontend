// File: src/components/ChatWindow.jsx import React, { useEffect, useState, useRef } from 'react'; import axios from 'axios'; import { FaCheckDouble } from 'react-icons/fa';

const ChatWindow = ({ onClose, receiverId, dealId }) => { const [messages, setMessages] = useState([]); const [input, setInput] = useState(''); const [status, setStatus] = useState(''); const [typing, setTyping] = useState(false); const messagesEndRef = useRef(null);

const token = localStorage.getItem('token');

const fetchMessages = async () => { try { const res = await axios.get(https://d-final.onrender.com/chat/messages/${receiverId}, { headers: { Authorization: Bearer ${token} } }); setMessages(res.data); scrollToBottom(); } catch (err) { setStatus('Failed to load messages.'); } };

const sendMessage = async () => { if (!input.trim()) return;

try {
  await axios.post('https://d-final.onrender.com/chat/send', {
    content: input,
    receiver_id: receiverId,
    deal_id: dealId,
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });

  setInput('');
  setTyping(false);
  fetchMessages();
} catch (err) {
  setStatus('Failed to send.');
}

};

const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); };

useEffect(() => { fetchMessages(); const interval = setInterval(fetchMessages, 5000); return () => clearInterval(interval); }, []);

useEffect(() => { if (input) { setTyping(true); } else { setTyping(false); } }, [input]);

return ( <div className="fixed bottom-20 right-4 z-50 w-80 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow-lg p-4"> <div className="flex justify-between items-center mb-2"> <h2 className="font-semibold text-gray-900 dark:text-white">Chat</h2> <button onClick={onClose} className="text-sm text-red-500">Close</button> </div>

<div className="h-56 overflow-y-auto space-y-2 mb-3 px-1">
    {messages.length > 0 ? messages.map((msg) => (
      <div key={msg.id} className={`text-sm p-2 rounded-lg w-fit max-w-[70%] ${msg.sender_id === receiverId ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white ml-auto' : 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-white'}`}>
        {msg.content}
        {msg.is_read && <FaCheckDouble className="inline-block ml-1 text-green-400 text-xs" />}
      </div>
    )) : (
      <p className="text-xs text-gray-500 text-center">No messages yet.</p>
    )}
    <div ref={messagesEndRef} />
  </div>

  {typing && (
    <p className="text-xs text-gray-400 mb-2">Typing...</p>
  )}

  <textarea
    rows={2}
    value={input}
    onChange={(e) => setInput(e.target.value)}
    placeholder="Type a message..."
    className="w-full px-3 py-2 rounded border bg-gray-100 dark:bg-gray-800 text-sm"
  />

  <button
    onClick={sendMessage}
    className="mt-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded font-semibold"
  >
    Send
  </button>

  {status && <p className="text-xs text-center text-red-500 mt-1">{status}</p>}
</div>

); };

export default ChatWindow;

