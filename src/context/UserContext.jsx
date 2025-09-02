// File: src/context/UserContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import API from '@/api'; // uses axios with Supabase-token interceptor

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  // Auth/session
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);           // Supabase auth user
  const [profile, setProfile] = useState(null);     // public.profiles row (optional, includes is_admin)

  // App data
  const [wallet, setWallet] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [notifications, setNotifications] = useState([]);

  // ---- AUTH STATE (Supabase) ----
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data?.session ?? null);
      setUser(data?.session?.user ?? null);
      setLoading(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_evt, newSession) => {
      if (!mounted) return;
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  // ---- PROFILE (optional Supabase table) ----
  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      return null;
    }
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, is_admin')
        .eq('id', user.id)
        .single();

      if (error) {
        // profiles table/row might not exist yet — keep it graceful
        setProfile(null);
        return null;
      }
      setProfile(data);
      return data;
    } catch {
      setProfile(null);
      return null;
    }
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // ---- APP DATA (from your FastAPI) ----
  const fetchAppData = useCallback(async () => {
    if (!session) {
      setWallet(null);
      setKycStatus(null);
      setNotifications([]);
      return;
    }
    try {
      // API has interceptor that adds Supabase JWT automatically
      const [userRes, walletRes, kycRes, notifRes] = await Promise.all([
        API.get('/auth/me'),                // expects JSON user (your backend)
        API.get('/wallet/my-wallet'),
        API.get('/kyc/my-kyc'),
        API.get('/notifications/my-notifications'),
      ]);

      // Keep your existing shapes
      // Note: user from backend can augment supabase user (e.g., legacy role)
      setWallet(walletRes.data?.wallet ?? null);
      setKycStatus(kycRes.data?.[0]?.status || 'N/A');
      setNotifications(notifRes.data ?? []);

      // If backend returns role, you can merge it into profile for compatibility:
      // (Optional) Only set if you rely on `user.role` in some screens.
      if (userRes?.data?.role && profile && profile.is_admin === undefined) {
        setProfile((p) => p ?? { is_admin: userRes.data.role === 'admin' });
      }
    } catch (error) {
      // If token invalid or server rejects, sign out to reset client state
      console.error('UserContext fetch error:', error);
    }
  }, [session, profile]);

  useEffect(() => {
    fetchAppData();
  }, [fetchAppData]);

  // ---- HELPERS ----
  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      setSession(null);
      setUser(null);
      setProfile(null);
      setWallet(null);
      setKycStatus(null);
      setNotifications([]);
      // No localStorage cleanup needed; we’re not storing tokens there anymore
    }
  };

  const getToken = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  };

  const refreshProfile = async () => fetchProfile();
  const refreshAppData = async () => fetchAppData();

  const isAdmin = !!profile?.is_admin;

  const value = useMemo(
    () => ({
      // auth
      loading,
      session,
      user,
      profile,
      isAdmin,

      // app data
      wallet,
      kycStatus,
      notifications,

      // helpers
      getToken,
      refreshProfile,
      refreshAppData,
      signOut,
    }),
    [loading, session, user, profile, isAdmin, wallet, kycStatus, notifications]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);

// (Optional) Keep this compatibility hook if some places still call it
export const useRequireAdmin = () => {
  const { isAdmin } = useUser();
  if (!isAdmin) throw new Error('Admin access only');
  return true;
};
```0
