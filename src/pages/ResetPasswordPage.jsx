// File: src/pages/ResetPasswordPage.jsx import React, { useState } from 'react'; import { useParams, useNavigate } from 'react-router-dom'; import { Helmet } from 'react-helmet'; import axios from 'axios';

export default function ResetPasswordPage() { const { token } = useParams(); const navigate = useNavigate(); const [password, setPassword] = useState(''); const [confirm, setConfirm] = useState(''); const [status, setStatus] = useState(null); const [loading, setLoading] = useState(false);

const handleReset = async (e) => { e.preventDefault();

if (password !== confirm) {
  setStatus('Passwords do not match.');
  return;
}

setStatus('Processing...');
setLoading(true);
try {
  const response = await axios.post(`https://d-final.onrender.com/auth/reset-password/${token}`, {
    new_password: password,
  });

  if (response.status === 200) {
    setStatus('Password reset successful! Redirecting to login...');
    setTimeout(() => navigate('/login'), 3000);
  } else {
    setStatus('Something went wrong.');
  }
} catch (error) {
  setStatus(error.response?.data?.detail || 'Reset failed. Token may be invalid or expired.');
} finally {
  setLoading(false);
}

};

return ( <> <Helmet> <title>Reset Password - Dealcross</title> <meta name="description" content="Choose a new password to access your Dealcross account." /> <meta name="keywords" content="reset password, new password, secure login" /> <meta name="author" content="Dealcross Team" /> <meta property="og:title" content="Reset Your Password - Dealcross" /> <meta property="og:description" content="Use this secure form to reset your Dealcross password." /> <meta property="og:type" content="website" /> <meta property="og:url" content="https://dealcross.com/reset-password" /> <meta name="twitter:card" content="summary" /> <meta name="twitter:title" content="Reset Password - Dealcross" /> <meta name="twitter:description" content="Update your login credentials securely via Dealcross." /> </Helmet>

<main className="min-h-screen flex items-center justify-center px-6 py-10 bg-white dark:bg-gray-950 text-gray-900 dark:text-white">
    <form
      onSubmit={handleReset}
      className="w-full max-w-md space-y-6 bg-white dark:bg-gray-900 p-8 rounded-xl shadow"
    >
      <h1 className="text-2xl font-bold text-center">Reset Password</h1>

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
        required
        className="w-full px-4 py-2 rounded bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none"
      />

      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm new password"
        required
        className="w-full px-4 py-2 rounded bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none"
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 text-white rounded font-semibold transition ${
          loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Updating...' : 'Update Password'}
      </button>

      {status && (
        <p className="text-sm text-yellow-400 text-center">{status}</p>
      )}
    </form>
  </main>
</>

); }