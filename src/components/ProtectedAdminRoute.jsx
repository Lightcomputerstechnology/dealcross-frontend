import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';           // ✅ Supabase client
import API, { getCurrentUser } from '@/api';         // ✅ Fallback to your backend if needed

/**
 * Admin guard:
 * 1) Try Supabase `profiles.is_admin` (recommended).
 * 2) If not available/false, fall back to your existing /auth/me (role === 'admin').
 */
export default function ProtectedAdminRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // Ensure there is a signed-in user (Supabase session)
        const { data: userResp, error: userErr } = await supabase.auth.getUser();
        if (userErr || !userResp?.user) {
          if (mounted) { setIsAdmin(false); setLoading(false); }
          return;
        }

        const userId = userResp.user.id;

        // --- Primary check: Supabase profiles.is_admin
        const { data: prof, error: profErr } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', userId)
          .single();

        if (!profErr && prof?.is_admin === true) {
          if (mounted) { setIsAdmin(true); setLoading(false); }
          return;
        }

        // --- Fallback: your backend /auth/me (expects { role: 'admin' })
        try {
          const me = await getCurrentUser(); // or: (await API.get('/auth/me')).data
          if (me?.role === 'admin') {
            if (mounted) { setIsAdmin(true); setLoading(false); }
            return;
          }
        } catch {
          // ignore; will fall through to unauthorized
        }

        if (mounted) { setIsAdmin(false); setLoading(false); }
      } catch (e) {
        if (mounted) { setIsAdmin(false); setLoading(false); }
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-600 dark:text-gray-300 text-lg">Checking admin access...</span>
      </div>
    );
  }

  return isAdmin ? children : <Navigate to="/unauthorized" replace />;
      }
