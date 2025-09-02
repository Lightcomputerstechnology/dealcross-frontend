// File: src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

export default function useAuthRedirect(options = {}) {
  const { redirectTo = '/login' } = options;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      // 1) Check current session
      const { data, error } = await supabase.auth.getSession();
      const session = data?.session;

      if (error || !session) {
        if (!mounted) return;
        toast.error('Please log in first.');
        navigate(redirectTo, { replace: true, state: { from: location.pathname } });
        return;
      }

      // 2) Optionally refresh on changes
      const { data: sub } = supabase.auth.onAuthStateChange((_evt, newSession) => {
        if (!mounted) return;
        if (!newSession) {
          toast.error('Session expired. Please log in again.');
          navigate(redirectTo, { replace: true });
        }
      });

      return () => sub?.subscription?.unsubscribe?.();
    };

    check();
    return () => { mounted = false; };
  }, [redirectTo, navigate, location.pathname]);

  // Return nothing; your ProtectedUserRoute just gates render until redirect happens.
  return false;
}
