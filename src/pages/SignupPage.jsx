import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // stored in user_metadata for now
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!email || !username || !password || !confirm) {
      setStatus('All fields are required.');
      return;
    }
    if (password !== confirm) {
      setStatus('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: { username },
        },
      });
      if (error) throw error;

      setStatus('Signup successful! Check your email to verify your account.');
      // Optional redirect after a short delay
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setStatus(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Sign Up - Dealcross</title>
        <meta name="description" content="Create a new Dealcross account to begin secure transactions." />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 text-gray-900 dark:text-white px-4">
        <motion.form
          onSubmit={handleSignup}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border dark:border-gray-700 space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400">
            Create Your Dealcross Account
          </h2>

          <input
            type="text"
            placeholder="Username (public)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-20 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-blue-500"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={`w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 ${
              confirm && password !== confirm
                ? 'border-red-500 ring-red-400'
                : 'focus:ring-blue-500'
            }`}
            required
          />
          {confirm && password !== confirm && (
            <p className="text-sm text-red-400">Passwords do not match</p>
          )}

          {status && <p className="text-sm text-yellow-500 text-center">{status}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold rounded-lg transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'Creating Account…' : 'Sign Up'}
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
              Log in
            </Link>
          </p>
        </motion.form>
      </main>
    </>
  );
          }
