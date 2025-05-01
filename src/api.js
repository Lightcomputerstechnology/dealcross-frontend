// File: src/api.js

import axios from 'axios';

// Axios instance
const API = axios.create({
  baseURL: 'https://d-final.onrender.com',
  headers: { 'Content-Type': 'application/json' },
});

// Attach auth token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Centralized error handler
const handleError = (error) => {
  console.error('API Error:', error);
  if (error.response) {
    const message = error.response.data?.detail || 'An error occurred.';
    throw new Error(message);
  } else if (error.request) {
    throw new Error('No response from server. Please check your connection.');
  } else {
    throw new Error('Request setup failed.');
  }
};

//
// ========== AUTH ==========
//
export const register = async (data) => {
  try {
    const res = await API.post('/auth/signup', data);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const login = async (formData) => {
  try {
    const res = await API.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const forgotPassword = async (email) => {
  try {
    const res = await API.post('/auth/forgot-password', { email });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await API.get('/auth/me');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== WALLET ==========
//
export const fundWalletCard = async (amount) => {
  try {
    const res = await API.post('/wallet/fund/card', { amount });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const fundWalletBank = async (amount) => {
  try {
    const res = await API.post('/wallet/fund/bank', { amount });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const fundWalletCrypto = async (amount, cryptoType) => {
  try {
    const res = await API.post('/wallet/fund/crypto', { amount, crypto_type: cryptoType });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getWalletBalance = async () => {
  try {
    const res = await API.get('/wallet/balance');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getWalletHistory = async () => {
  try {
    const res = await API.get('/wallet/transactions');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getWalletSummary = async () => {
  try {
    const res = await API.get('/wallet/summary');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== KYC ==========
//
export const getKYCStatus = async () => {
  try {
    const res = await API.get('/kyc/my-status');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== DEALS ==========
//
export const getMyDeals = async () => {
  try {
    const res = await API.get('/deals/tracker');
    return res.data.data;
  } catch (err) {
    handleError(err);
  }
};

export const getConfirmedPairing = async () => {
  try {
    const res = await API.get('/deals/pairing/confirmed');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const fundDeal = async (dealId) => {
  try {
    const res = await API.post(`/deals/${dealId}/fund`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const deliverDeal = async (dealId, deliveryData) => {
  try {
    const res = await API.post(`/deals/${dealId}/deliver`, deliveryData);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const releaseDeal = async (dealId) => {
  try {
    const res = await API.post(`/deals/${dealId}/release`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const disputeDeal = async (dealId, reason) => {
  try {
    const res = await API.post('/disputes/', { deal_id: dealId, reason });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getPendingPairings = async () => {
  try {
    const res = await API.get('/deals/pairing/pending');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const confirmPairing = async (pairingId) => {
  try {
    const res = await API.post(`/deals/pairing/confirm/${pairingId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== SUBSCRIPTION UPGRADE ==========
//
export const upgradeSubscriptionCard = async (plan) => {
  try {
    const res = await API.post('/subscriptions/upgrade/card', { plan });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const upgradeSubscriptionBank = async (plan) => {
  try {
    const res = await API.post('/subscriptions/upgrade/bank', { plan });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const upgradeSubscriptionCrypto = async (plan, cryptoType) => {
  try {
    const res = await API.post('/subscriptions/upgrade/crypto', { plan, crypto_type: cryptoType });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== ADMIN USER MANAGEMENT ==========
//
export const getAllUsers = async () => {
  try {
    const res = await API.get('/admin/all-users');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const banUser = async (userId, reason) => {
  try {
    const res = await API.put(`/admin/ban-user/${userId}`, { reason });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const unbanUser = async (userId) => {
  try {
    const res = await API.put(`/admin/unban-user/${userId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const approveUser = async (userId, note) => {
  try {
    const res = await API.post(`/admin/approve-user/${userId}`, { note });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== ADMIN LOGS & METRICS ==========
//
export const getAuditLogs = async () => {
  try {
    const res = await API.get('/admin/audit-logs');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getAdminMetrics = async () => {
  try {
    const res = await API.get('/admin-metrics');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getFraudReports = async () => {
  try {
    const res = await API.get('/admin/fraud-reports');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getAdminChartData = async () => {
  try {
    const res = await API.get('/admin/charts');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== ADMIN CHAT THREADS ==========
export const getAllChatThreads = async () => {
  try {
    const res = await API.get('/admin/chat/threads');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getThreadMessages = async (threadId) => {
  try {
    const res = await API.get(`/admin/chat/threads/${threadId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};


//
// ========== INVESTOR ==========
export const getInvestorReports = async () => {
  try {
    const res = await API.get('/investor/reports');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== ESCROW ==========
export const getEscrowTracker = async () => {
  try {
    const res = await API.get('/escrow-tracker');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== SHARE TRADING ==========
export const getShareTradingTips = async () => {
  try {
    const res = await API.get('/share-trading/tips');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== CHAT SUPPORT ==========
export const getChatMessages = async (dealId) => {
  try {
    const res = await API.get(`/chat/messages?deal_id=${dealId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const sendMessage = async (dealId, message) => {
  try {
    const res = await API.post('/chat/send', {
      deal_id: dealId,
      message: message,
    });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const markMessagesAsRead = async (dealId) => {
  try {
    const res = await API.post(`/chat/mark-read`, { deal_id: dealId });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getUnreadMessageCount = async () => {
  try {
    const res = await API.get('/chat/unread-count');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== BLOG ==========
export const getBlogPosts = async () => {
  try {
    const res = await API.get('/blog/posts');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getBlogDetails = async (slug) => {
  try {
    const res = await API.get(`/blog/posts/${slug}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

//
// ========== SYSTEM HEALTH ==========
export const getServerHealth = async () => {
  try {
    const res = await API.get('/system/health');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};


// Upload KYC documents (multipart/form-data)
export const uploadKYC = async (formData) => {
  try {
    const res = await API.post('/kyc/submit', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (err) {
    console.error('uploadKYC failed:', err);
    throw new Error('KYC upload failed.');
  }
};

// Update current user profile (username/email/password)
export const updateProfile = async (updates) => {
  try {
    const res = await API.put('/user/profile/update', updates);
    return res.data;
  } catch (err) {
    console.error('updateProfile failed:', err);
    throw new Error('Profile update failed.');
  }
};

// Retrieve user settings and fee tiers
export const getUserSettings = async () => {
  try {
    const res = await API.get('/user/settings');
    return res.data.data;
  } catch (err) {
    console.error('getUserSettings failed:', err);
    throw new Error('Could not fetch user settings.');
  }
};


// Admin: Get all pending deals
export const getPendingDeals = async () => {
  try {
    const res = await API.get('/admin/pending-deals');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};


// Admin: Approve a deal by ID
export const approveDealById = async (dealId) => {
  try {
    const res = await API.post(`/admin/approve-deal/${dealId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};


// Fetch chat messages for a specific deal
export const getDealMessages = async (dealId) => {
  try {
    const res = await API.get(`/chat/messages?deal_id=${dealId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export default API;
