// File: src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [kycStatus, setKycStatus] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const base = 'https://dealcross-backend-kcar.onrender.com';
        const headers = { Authorization: `Bearer ${token}` };

        const [userRes, walletRes, kycRes, notifRes] = await Promise.all([
          axios.get(`${base}/auth/me`, { headers }),
          axios.get(`${base}/wallet/my-wallet`, { headers }),
          axios.get(`${base}/kyc/my-kyc`, { headers }),
          axios.get(`${base}/notifications/my-notifications`, { headers })
        ]);

        setUser(userRes.data);
        setWallet(walletRes.data.wallet);
        setKycStatus(kycRes.data[0]?.status || 'N/A');
        setNotifications(notifRes.data);
      } catch (error) {
        console.error('User context error:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setWallet(null);
    setKycStatus(null);
    setNotifications([]);
  };

  return (
    <UserContext.Provider value={{ user, wallet, kycStatus, notifications, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
