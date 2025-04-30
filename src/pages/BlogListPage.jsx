// File: src/pages/BlogListPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    title: 'Why Dealcross Beats Other Platforms',
    path: '/why-dealcross',
    date: '2025-03-01',
    readTime: '3 min',
  },
  {
    title: 'Understanding Dispute Resolution on Dealcross',
    path: '/dispute-guide',
    date: '2025-03-05',
    readTime: '4 min',
  },
  {
    title: 'Fast Payouts on Dealcross',
    path: '/fast-payouts',
    date: '2025-03-08',
    readTime: '2 min',
  },
  {
    title: 'Why Dealcross Is Changing Online Transactions',
    path: '/intro-to-dealcross',
    date: '2025-03-12',
    readTime: '3 min',
  },
  {
    title: 'Tips for First-Time Share Traders on Dealcross',
    path: '/share-trading-tips',
    date: '2025-03-18',
    readTime: '5 min',
  },
];

export default function BlogListPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>
      <ul className="space-y-6">
        {blogPosts.map((post, index) => (
          <li key={index} className="border-b border-gray-300 dark:border-gray-700 pb-4">
            <Link
              to={post.path}
              className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-semibold"
            >
              {post.title}
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {new Date(post.date).toLocaleDateString()} • {post.readTime}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
