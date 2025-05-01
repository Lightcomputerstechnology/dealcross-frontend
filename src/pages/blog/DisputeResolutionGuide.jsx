// File: src/pages/blog/DisputeResolutionGuide.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { getBlogDetails } from '@/api';
import { toast } from 'react-hot-toast';

export default function DisputeResolutionGuide() {
  const { slug = 'dispute-guide' } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogDetails(slug);
        setPost(data);
      } catch (err) {
        toast.error('Failed to load blog post.');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-900 dark:text-white">
      <Helmet>
        <title>{post?.title || 'Blog'} - Dealcross</title>
        <meta name="description" content={post?.excerpt || 'Dealcross blog post'} />
      </Helmet>

      {loading ? (
        <p className="text-yellow-400">Loading...</p>
      ) : post ? (
        <>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            {new Date(post.date).toLocaleDateString()} • {post.read_time || '2 min'}
          </div>
          <div
            className="prose prose-lg dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </>
      ) : (
        <p className="text-gray-500">Post not found.</p>
      )}
    </main>
  );
}
