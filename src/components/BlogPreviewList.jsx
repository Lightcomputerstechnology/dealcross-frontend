// File: src/components/BlogPreviewList.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaGavel, FaMoneyCheckAlt } from 'react-icons/fa';

const blogPosts = [
  {
    title: 'Why Dealcross Beats Other Platforms',
    link: '/why-dealcross',
    summary: 'Discover what makes Dealcross more secure and scalable.',
    icon: <FaShieldAlt className="text-blue-500 text-3xl" />,
  },
  {
    title: 'Understanding Dispute Resolution on Dealcross',
    link: '/dispute-guide',
    summary: 'See how our dispute system protects both buyers and sellers.',
    icon: <FaGavel className="text-yellow-500 text-3xl" />,
  },
  {
    title: 'Fast Payouts on Dealcross',
    link: '/fast-payouts',
    summary: 'Learn how funds are released quickly after deal success.',
    icon: <FaMoneyCheckAlt className="text-green-500 text-3xl" />,
  },
];

const BlogPreviewList = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center md:text-left">
          From the Blog
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Link
              to={post.link}
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700 group"
            >
              <div className="mb-3 group-hover:scale-105 transition-transform">{post.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{post.summary}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-block text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            View All Posts →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewList;