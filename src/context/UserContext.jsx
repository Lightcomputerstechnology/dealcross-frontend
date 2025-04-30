import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser } from '@/api';
import { useNavigate } from 'react-router-dom';

// Create user context
const UserContext = createContext(null);

// Provider for global user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch current user from API
  const refreshUser = async () => {
    try {
      const data = await getCurrentUser();
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (err) {
      setUser(null);
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  // Initialize user on first load
  useEffect(() => {
    refreshUser();
  }, []);

  // Logout method
  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
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
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook for accessing user info
export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
};

// Hook for admin-only access
export const useRequireAdmin = () => {
  const { user, loading } = useUser();
  if (!loading && user?.role !== 'admin') {
    throw new Error('Access denied: Admins only');
  }
  return { user };
};