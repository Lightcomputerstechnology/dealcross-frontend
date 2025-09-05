// File: src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

// Shape of the context
const AuthContext = createContext({
  loading: true,
  isAuthenticated: false,
  session: null,
  user: null,
  profile: null,        // from Supabase "profiles" table (if present)
  isAdmin: false,       // profiles.is_admin === true
  login: async (_email, _password) => {},
  logout: async () => {},
  getToken: async () => null,
  refreshProfile: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const isAuthenticated = !!user;

  // 1) Initialize & subscribe to auth state
  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession ?? null);
      setUser(newSession?.user ?? null);
      // when auth changes, we’ll re-fetch profile in the profile effect below
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  // 2) Fetch profile (optional table: public.profiles with is_admin)
  const fetchProfile = React.useCallback(async () => {
    if (!user) {
      setProfile(null);
      return null;
    }
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, is_admin")
        .eq("id", user.id)
        .single();

      if (error) {
        // Table or row might not exist yet; keep it graceful
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
    // whenever user changes, try to load profile
    fetchProfile();
  }, [user, fetchProfile]);

  // 3) Helpers
  const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    // session/user will be cleared by the onAuthStateChange listener
  };

  const getToken = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  };

  const refreshProfile = async () => {
    return fetchProfile();
  };

  const isAdmin = !!profile?.is_admin;

  const value = useMemo(
    () => ({
      loading,
      isAuthenticated,
      session,
      user,
      profile,
      isAdmin,
      login,
      logout,
      getToken,
      refreshProfile,
    }),
    [loading, isAuthenticated, session, user, profile, isAdmin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Convenience hook
export const useAuth = () => useContext(AuthContext);
