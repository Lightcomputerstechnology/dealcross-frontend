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
    <main className="max-w-6xl mx-auto px-4 py-16 text-gray-900 dark:text-white">
      <Helmet>
        <title>Blog - Dealcross</title>
        <meta name="description" content="Stay updated with the latest insights and platform news from Dealcross." />
        <meta name="keywords" content="dealcross blog, updates, tutorials, fintech news, trading tips" />
        <meta name="author" content="Dealcross Team" />
        <meta property="og:title" content="Dealcross Blog" />
        <meta property="og:description" content="Explore insights and updates from the Dealcross platform." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dealcross.com/blog" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Dealcross Blog" />
        <meta name="twitter:description" content="Stay informed with news and tips from the Dealcross team." />
      </Helmet>

      <h1 className="text-4xl font-bold text-center mb-6">Latest Blog Posts</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
        Tips, insights, and updates to help you get the most out of Dealcross.
      </p>

      {loading ? (
        <p className="text-center text-yellow-400">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400">No blog posts found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2">
          {posts.map((post, index) => (
            <Link
              key={index}
              to={`/blog/${post.slug}`}
              className="block p-6 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{post.title}</h2>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.published_at).toLocaleDateString()} • {post.read_time || '2 min'}
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-300 line-clamp-3">
                {post.excerpt || 'Click to read more.'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}