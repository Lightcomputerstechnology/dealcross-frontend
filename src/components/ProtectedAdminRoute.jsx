// File: src/components/ProtectedAdminRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import API, { getCurrentUser } from '@/api';
import LoadingScreen from '@/components/LoadingScreen';

/**
 * Admin guard:
 * 1) Try Supabase `profiles.is_admin`.
 * 2) If not true, fallback to backend `/auth/me` expecting { role: 'admin' }.
 */
export default function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data: userResp, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userResp?.user) {
          if (mounted) { setIsAdmin(false); setLoading(false); }
          return;
        }

        const userId = userResp.user.id;

        // Primary: Supabase profiles.is_admin
        const { data: prof, error: profErr } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', userId)
          .single();

        if (!profErr && prof?.is_admin === true) {
          if (mounted) { setIsAdmin(true); setLoading(false); }
          return;
        }

        // Fallback: backend role
        try {
          const me = await getCurrentUser();
          if (me?.role === 'admin') {
            if (mounted) { setIsAdmin(true); setLoading(false); }
            return;
          }
        } catch {
          // ignore; fall through
        }

        if (mounted) { setIsAdmin(false); setLoading(false); }
      } catch {
        if (mounted) { setIsAdmin(false); setLoading(false); }
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) return <LoadingScreen label="Checking admin access…" />;
  return isAdmin ? children : <Navigate to="/unauthorized" replace />;
            }
