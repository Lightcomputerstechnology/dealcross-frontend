// File: src/pages/AdminChatViewer.jsx

import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { getAllChatThreads, getThreadMessages } from '@/api';
import { toast } from 'react-hot-toast';

export default function AdminChatViewer() {
  const [threads, setThreads] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedThreadId, setSelectedThreadId] = useState(null);
  const [loadingThreads, setLoadingThreads] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    setLoadingThreads(true);
    try {
      const data = await getAllChatThreads();
      setThreads(data || []);
    } catch (err) {
      toast.error('Failed to fetch chat threads.');
    } finally {
      setLoadingThreads(false);
    }
  };

  const loadMessages = async (threadId) => {
    setSelectedThreadId(threadId);
    setLoadingMessages(true);
    try {
      const data = await getThreadMessages(threadId);
      setMessages(data || []);
    } catch (err) {
      toast.error('Failed to load messages.');
    } finally {
      setLoadingMessages(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Chat Viewer - Dealcross</title>
        <meta name="description" content="View all chat messages by users in the Dealcross platform." />
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Chat Threads</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Threads List */}
          <div className="bg-gray-900 p-4 rounded shadow overflow-y-auto max-h-[80vh]">
            <h2 className="text-lg font-semibold mb-3">User Threads</h2>
            {loadingThreads ? (
              <p className="text-yellow-400">Loading...</p>
            ) : threads.length === 0 ? (
              <p className="text-gray-400">No threads found.</p>
            ) : (
              <ul className="space-y-3">
                {threads.map((thread) => (
                  <li
                    key={thread.thread_id}
                    onClick={() => loadMessages(thread.thread_id)}
                    className={`p-3 rounded cursor-pointer transition ${
                      selectedThreadId === thread.thread_id
                        ? 'bg-blue-600'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <p className="font-semibold">{thread.username || 'User'} (ID: {thread.user_id})</p>
                    <p className="text-xs text-gray-300">
                      Last: {new Date(thread.last_updated).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Messages Viewer */}
          <div className="md:col-span-2 bg-gray-900 p-4 rounded shadow overflow-y-auto max-h-[80vh]">
            <h2 className="text-lg font-semibold mb-3">Messages</h2>
            {loadingMessages ? (
              <p className="text-yellow-400">Loading messages...</p>
            ) : selectedThreadId === null ? (
              <p className="text-gray-400">Select a thread to view messages.</p>
            ) : messages.length === 0 ? (
              <p className="text-gray-400">No messages in this thread.</p>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded max-w-xl ${
                      msg.sender === 'admin' ? 'bg-blue-600 self-end' : 'bg-gray-700'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs text-gray-300 mt-1 text-right">
                      {new Date(msg.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
