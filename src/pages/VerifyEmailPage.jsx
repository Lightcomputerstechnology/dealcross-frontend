import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { toast } from 'react-hot-toast';
import { verifyEmail } from '@/api/optional';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('Verifying...');
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('Invalid verification link.');
      setSuccess(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyEmail(token);
        setStatus(res?.message || 'Email verified successfully.');
        setSuccess(true);
        toast.success('Email verified!');
        setTimeout(() => navigate('/login'), 5000);
      } catch (err) {
        setStatus(err.message || 'Verification failed.');
        setSuccess(false);
        toast.error(err.message || 'Verification failed.');
      }
    };

    verify();
  }, [searchParams, navigate]);

  return (
    <>
      <Helmet>
        <title>Verify Email - Dealcross</title>
      </Helmet>

      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4">
        <div className="bg-[#1e293b] p-8 rounded-lg max-w-md w-full text-center shadow-lg space-y-4">
          {/* Logo (optional) */}
          <img src="/favicon.png" alt="Dealcross" className="w-12 h-12 mx-auto mb-2" />

          <h2 className="text-2xl font-bold">Email Verification</h2>

          {/* Status Icon */}
          {success === true && <FiCheckCircle className="text-green-400 text-4xl mx-auto" />}
          {success === false && <FiXCircle className="text-red-400 text-4xl mx-auto" />}

          {/* Message */}
          <p className="text-sm text-gray-300">{status}</p>

          {/* Action Button */}
          <Link to="/login">
            <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}