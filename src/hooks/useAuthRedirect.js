// File: src/hooks/useAuthRedirect.js

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '@/api';
import { toast } from 'react-hot-toast';

export default function useAuthRedirect(options = {}) {
  const { adminOnly = false, redirectTo = '/login' } = options;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        toast.error('Please log in first.');
        return navigate(redirectTo, { replace: true, state: { from: location.pathname } });
      }

      try {
        const user = await getCurrentUser();

        if (adminOnly && user?.role !== 'admin') {
          toast.error('Access denied. Admins only.');
          return navigate('/', { replace: true });
        }

      } catch (err) {
        toast.error('Session expired. Please log in again.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate(redirectTo, { replace: true });
      }
    };

    checkAuth();
  }, [adminOnly, redirectTo, navigate, location.pathname]);
}
