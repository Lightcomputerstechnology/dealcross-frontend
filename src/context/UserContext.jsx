// File: src/context/UserContext.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '@/api';

// Create User Context
const UserContext = createContext(null);

// Provider for user authentication and roles
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isModerator: user?.role === 'moderator',
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook to access user context
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
};

// Optional admin enforcement hook
export const useRequireAdmin = () => {
  const { user, loading } = useUser();

  if (!loading && user?.role !== 'admin') {
    throw new Error('Access denied: Admins only');
  }

  return { user };
};
