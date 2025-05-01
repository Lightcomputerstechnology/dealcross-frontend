import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getBlogPosts } from '@/api';
import { toast } from 'react-hot-toast';

export default function BlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogPosts();
        setBlogs(data || []);
      } catch (err) {
        toast.error('Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-900 dark:text-white">
      <Helmet>
        <title>Blog - Dealcross</title>
        <meta name="description" content="Explore blog posts from Dealcross on secure trading, tips, and more." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      {loading ? (
        <p className="text-yellow-400">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-gray-500">No blog posts found.</p>
      ) : (
        <ul className="space-y-6">
          {blogs.map((post, index) => (
            <li key={index} className="border-b border-gray-300 dark:border-gray-700 pb-4">
              <Link
                to={`/blog/${post.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-semibold"
              >
                {post.title}
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(post.date).toLocaleDateString()} • {post.read_time || '2 min'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}