// File: src/pages/BlogDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Helmet } from 'react-helmet';

export default function BlogDetails() {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    import(`../posts/${id}.md`)
      .then((res) => fetch(res.default).then((r) => r.text()).then(setContent))
      .catch(() => {
        setError(true);
        setContent('# 404\n\n**Blog post not found.**');
      });
  }, [id]);

  return (
    <>
      <Helmet>
        <title>{id.replace(/-/g, ' ').toUpperCase()} - Dealcross Blog</title>
        <meta name="description" content={`Dealcross blog post: ${id}`} />
      </Helmet>

      <main className="max-w-3xl mx-auto py-16 px-6 text-gray-900 dark:text-white">
        <div className="mb-6">
          <Link to="/blog" className="text-blue-500 hover:underline">&larr; Back to Blog</Link>
        </div>

        <ReactMarkdown className="prose dark:prose-invert max-w-none">
          {content}
        </ReactMarkdown>

        {error && (
          <div className="mt-8 text-center text-red-400">
            If you believe this post should exist, please contact support.
          </div>
        )}
      </main>
    </>
  );
}
