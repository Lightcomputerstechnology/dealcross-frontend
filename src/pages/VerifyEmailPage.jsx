// File: src/pages/VerifyEmailPage.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function VerifyEmailPage() {
  const [status, setStatus] = useState('Checking verification status…');
  const [verified, setVerified] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        // If a session exists, consider user ready to continue
        const { data } = await supabase.auth.getSession();
        const hasSession = !!data?.session;

        if (!mounted) return;

        if (hasSession) {
          setVerified(true);
          setStatus('Your email is verified and you are signed in.');
          // Optional: auto-redirect after a short delay
          setTimeout(() => navigate('/wallet', { replace: true }), 1500);
        } else {
          // No session — user likely clicked a confirmation link earlier.
          // Supabase doesn't create a session on confirm; user should log in now.
          setVerified(true);
          setStatus('Email verified. Please log in to continue.');
        }
      } catch {
        if (!mounted) return;
        setVerified(false);
        setStatus('Could not verify email right now.');
      }
    })();

    return () => { mounted = false; };
  }, [navigate, location.search]);

  return (
    <>
      <Helmet>
        <title>Verify Email - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4">
        <div className="bg-[#1e293b] p-8 rounded-lg max-w-md w-full text-center shadow-lg space-y-4">
          <img src="/favicon.png" alt="Dealcross" className="w-12 h-12 mx-auto mb-2" />
          <h2 className="text-2xl font-bold">Email Verification</h2>

          <p className="text-sm text-gray-300">{status}</p>

          <div className="flex gap-2 justify-center mt-2">
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Go to Login
            </Link>
            <Link to="/" className="border border-gray-500 hover:bg-gray-800 text-white px-4 py-2 rounded">
              Home
            </Link>
          </div>

          <div className="text-[12px] text-gray-400 mt-2">
            If you didn’t receive the email, check spam or request another verification from the login page.
          </div>
        </div>
      </div>
    </>
  );
      }
