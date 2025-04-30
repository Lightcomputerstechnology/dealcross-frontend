import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import blogPosts from '@/data/blogPosts';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Post Not Found</h1>
        <Link to="/blog" className="text-blue-500 underline">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} - Dealcross Blog</title>
        <meta name="description" content={post.excerpt || "Read insightful articles on finance, escrow, and Dealcross updates."} />
        <meta name="author" content="Dealcross Team" />
      </Helmet>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">Published by Dealcross</p>

        <article className="prose dark:prose-invert max-w-none">
          {post.content}
        </article>

        <div className="mt-10">
          <Link to="/blog" className="text-blue-500 underline">← Back to Blog</Link>
        </div>
      </main>
    </>
  );
}
