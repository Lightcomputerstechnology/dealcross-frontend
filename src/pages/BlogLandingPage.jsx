// File: src/pages/BlogLandingPage.jsx (Upgraded with Search & Filter)

import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import blogPosts from '@/data/blogPosts';

export default function BlogLandingPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...new Set(blogPosts.map((p) => p.category).filter(Boolean))];

  const filtered = blogPosts.filter((post) => {
    const matchesQuery =
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === 'All' || post.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-12 text-gray-900 dark:text-white">
      <Helmet>
        <title>Blog - Dealcross Insights & News</title>
        <meta name="description" content="Stay informed with financial tips, platform updates, and expert articles from the Dealcross blog." />
      </Helmet>

      <motion.h1 className="text-4xl font-bold mb-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        Dealcross Blog
      </motion.h1>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/2 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded"
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-400">No matching blog posts found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((post, index) => (
            <motion.div
              key={post.slug}
              className="p-4 rounded-md border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{post.excerpt}</p>
              <div className="text-xs text-gray-400 mb-2">
                {post.date && <span>{new Date(post.date).toLocaleDateString()}</span>}
                {post.category && (
                  <span className="ml-2 px-2 py-0.5 bg-blue-600 text-white rounded">{post.category}</span>
                )}
              </div>
              <Link to={`/blog/${post.slug}`} className="text-blue-500 underline text-sm">Read More</Link>
            </motion.div>
          ))}
        </div>
      )}
    </main>
  );
                           }
