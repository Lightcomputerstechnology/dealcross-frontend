// File: src/components/ProtectedUserRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function ProtectedUserRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (mounted) {
        setSession(data?.session ?? null);
        setLoading(false);
      }
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, newSession) => {
      if (mounted) setSession(newSession);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-600 dark:text-gray-300 text-lg">Loading…</span>
      </div>
    );
  }

  return session ? children : <Navigate to="/login" replace />;
}
