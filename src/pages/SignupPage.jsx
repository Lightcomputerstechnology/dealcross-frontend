// File: src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { register } from '@/api';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
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
      await register({ email, username, password });
      setStatus('Signup successful! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
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

      <form
        onSubmit={handleSignup}
        className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md space-y-6 mx-auto mt-16"
      >
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
          required
        />

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input pr-20"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-sm text-blue-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={`input ${
            confirm && password !== confirm ? 'border-red-500' : ''
          }`}
          required
        />
        {confirm && password !== confirm && (
          <p className="text-sm text-red-400">Passwords do not match</p>
        )}

        {status && <p className="text-sm text-yellow-400 text-center">{status}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 rounded-lg transition ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline dark:text-blue-400">
            Log in
          </a>
        </p>
      </form>
    </>
  );
};

export default SignupPage;