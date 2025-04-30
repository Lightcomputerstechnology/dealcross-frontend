// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-4">404 – Page Not Found</h1>
      <p className="mb-6 text-center">Sorry, we can’t find what you’re looking for.</p>
      <Link to="/" className="text-blue-600 underline">
        Back to home
      </Link>
    </main>
  );
}