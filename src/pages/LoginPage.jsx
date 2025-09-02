import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setStatus('Please enter both email and password.');
      return;
    }
    setLoading(true);
    setStatus('Processing...');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setStatus('Login successful!');
      navigate('/wallet', { replace: true });
    } catch (err) {
      setStatus(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setStatus('Enter your email to receive a magic link.');
      return;
    }
    setLoading(true);
    setStatus('Sending magic link...');
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: `${window.location.origin}/wallet` },
      });
      if (error) throw error;
      setStatus('Magic link sent. Check your inbox.');
    } catch (err) {
      setStatus(err.message || 'Could not send magic link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login - Dealcross</title>
        <meta name="description" content="Securely log in to your Dealcross account." />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-4">
        <motion.form
          onSubmit={handlePasswordLogin}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border dark:border-gray-700 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">Login to Dealcross</h2>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {status && <p className="text-sm text-center text-yellow-500">{status}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <button
            type="button"
            onClick={handleMagicLink}
            disabled={loading}
            className="w-full py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 font-semibold rounded-lg transition disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send magic link to email'}
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </motion.form>
      </main>
    </>
  );
  }
