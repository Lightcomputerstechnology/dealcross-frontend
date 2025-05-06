import React from 'react';
import ChatWindow from '../components/ChatWindow';
import { useParams } from 'react-router-dom';

export default function DealChatPage() {
  const { id, userId } = useParams();

  return (
    <main className="min-h-screen px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Chat with Deal Partner</h1>
        <ChatWindow dealId={id} userId={parseInt(userId)} />
      </div>
    </main>
  );
}
