import React, { useState, useEffect, useRef } from 'react';

const ChatPopup = ({ visible, onClose, dealId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    if (!dealId || !visible) return;

    ws.current = new WebSocket(`wss://d-final.onrender.com/ws/chat/${dealId}`);

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      setMessages((prev) => [...prev, msg]);
    };

    return () => {
      ws.current?.close();
    };
  }, [dealId, visible]);

  const sendMessage = () => {
    if (ws.current && input.trim()) {
      ws.current.send(JSON.stringify({ message: input }));
      setInput('');
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 right-4 w-80 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg border dark:border-gray-700 z-50 flex flex-col">
      <div className="flex justify-between items-center p-3 border-b dark:border-gray-600">
        <span className="font-semibold">Deal Chat</span>
        <button onClick={onClose} className="text-red-500 font-bold">&times;</button>
      </div>
      <div className="flex-1 p-3 overflow-y-auto space-y-2">
        {messages.map((msg, i) => (
          <div key={i} className="text-sm bg-gray-100 dark:bg-gray-700 p-2 rounded">
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex border-t dark:border-gray-600">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          className="flex-1 p-2 bg-white dark:bg-gray-800 outline-none"
        />
        <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700 px-3 text-white">Send</button>
      </div>
    </div>
  );
};

export default ChatPopup;