import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getBlogDetails } from '@/api';
import { toast } from 'react-hot-toast';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const data = await getBlogDetails(slug);
      setPost(data);
    } catch (err) {
      toast.error('Post not found.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  if (loading) return <div className="p-10 text-yellow-400">Loading blog post...</div>;
  if (!post) return <div className="p-10 text-red-500">Post not found.</div>;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-gray-900 dark:text-white">
      <Helmet>
        <title>{post.title} - Dealcross Blog</title>
        <meta name="description" content={post.summary || 'Read this article on Dealcross'} />
        <meta name="keywords" content="Dealcross, Blog, Escrow, Trading, Fintech, Security, Tips" />
        <meta name="author" content="Dealcross Team" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.summary || post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://dealcross-frontend.onrender.com/blog/${slug}`} />
        <meta property="og:image" content={post.image || 'https://dealcross.com/assets/blog-default.jpg'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.summary || post.title} />
        <meta name="twitter:image" content={post.image || 'https://dealcross.com/assets/blog-default.jpg'} />
      </Helmet>

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {new Date(post.published_at).toLocaleDateString()} • {post.read_time || '2 min read'}
      </p>

      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-10">
        <Link to="/blog" className="text-blue-600 dark:text-blue-400 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}