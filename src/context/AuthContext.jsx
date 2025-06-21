// File: src/context/AuthContext.jsx

import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Load from localStorage on first load
    const savedAuth = localStorage.getItem("isAuthenticated");
    return savedAuth === "true";
  });

  // Sync changes to localStorage
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  // Handle login
  const login = () => {
    setIsAuthenticated(true);
  };

  // Handle logout
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
    // optionally: redirect to login or home
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
