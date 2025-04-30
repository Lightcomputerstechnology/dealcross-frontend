import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiMessageCircle } from 'react-icons/fi';
import axios from 'axios';

const FloatingChatButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [unread, setUnread] = useState(false);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('https://d-final.onrender.com/chat/unread', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUnread(res.data.unread_count > 0);
      } catch (err) {
        console.error('Unread check failed:', err);
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 15000);
    return () => clearInterval(interval);
  }, []);

  if (location.pathname === '/chat-support') return null;

  return (
    <button
      onClick={() => navigate('/chat-support')}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition hover:scale-105"
      aria-label="Open Chat Support"
    >
      <FiMessageCircle className="text-2xl" />
      {unread && (
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border border-white rounded-full animate-ping" />
      )}
    </button>
  );
};

export default FloatingChatButton;
