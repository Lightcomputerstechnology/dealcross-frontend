// File: src/pages/VerifyEmailPage.jsx

import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { verifyEmail } from '@/api/optional';

const VerifyEmailPage = () => {
  const [status, setStatus] = useState('Verifying...');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('Invalid verification link.');
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setStatus(res?.message || 'Email verified successfully.');
        toast.success('Email verified successfully!');
        setTimeout(() => navigate('/login'), 3000);
      } catch (err) {
        setStatus(err.message || 'Verification failed.');
        toast.error(err.message || 'Email verification failed.');
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4">
      <Helmet>
        <title>Email Verification - Dealcross</title>
      </Helmet>
      <div className="bg-[#1e293b] max-w-md w-full p-6 rounded-lg shadow text-center">
        <h1 className="text-xl font-bold mb-4">Email Verification</h1>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;