// File: src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/api';
import { Helmet } from 'react-helmet';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setStatus('Please enter both email and password.');
      return;
    }

    setStatus('Processing...');
    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const result = await login(formData);
      localStorage.setItem('token', result.access_token);
      setStatus('Login successful!');
      navigate('/wallet');
    } catch (err) {
      setStatus(err.message || 'Login failed.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Dealcross</title>
        <meta name="description" content="Securely log in to your Dealcross account." />
      </Helmet>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md space-y-6 mx-auto mt-16"
      >
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />

        {status && (
          <p className="text-sm text-yellow-400 text-center">{status}</p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
            Sign up
          </a>
        </p>
      </form>
    </>
  );
}