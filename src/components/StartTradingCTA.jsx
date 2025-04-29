// File: src/components/StartTradingCTA.jsx

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StartTradingCTA = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleRedirect = () => {
    navigate('/dashboard');
  };

  return (
    <section className="bg-blue-600 dark:bg-blue-700 text-white py-16 px-4 text-center animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Trade with Confidence?
        </h2>
        <p className="mb-6 text-lg text-white/90">
          {isLoggedIn
            ? 'You’re already logged in. Go straight to your dashboard.'
            : 'Start your secure transaction now or sign up to explore all features.'}
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {isLoggedIn ? (
            <button
              onClick={handleRedirect}
              className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition shadow"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <Link
                to="/start-deal"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md font-semibold transition shadow"
              >
                Start a Deal
              </Link>
              <Link
                to="/signup"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-semibold transition shadow"
              >
                Sign Up Now
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default StartTradingCTA;