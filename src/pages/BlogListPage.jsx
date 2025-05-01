import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getBlogPosts } from '@/api';
import { toast } from 'react-hot-toast';

export default function BlogListPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const data = await getBlogPosts();
      setPosts(data);
    } catch (err) {
      toast.error('Failed to load blog posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-900 dark:text-white">
      <Helmet>
        <title>Blog - Dealcross</title>
        <meta name="description" content="Stay updated with the latest insights and platform news from Dealcross." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      {loading ? (
        <p className="text-yellow-400">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-400">No blog posts found.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post, index) => (
            <li key={index} className="border-b border-gray-300 dark:border-gray-700 pb-4">
              <Link
                to={`/blog/${post.slug}`}
                className="text-blue-600 dark:text-blue-400 hover:underline text-lg font-semibold"
              >
                {post.title}
              </Link>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {new Date(post.published_at).toLocaleDateString()} • {post.read_time || '2 min'}
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}