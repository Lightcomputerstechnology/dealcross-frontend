// File: src/api.js
import axios from 'axios';
import { supabase } from './lib/supabase';

/**
 * Use Vite env if present. Fallback to your current Render backend URL.
 * Change VITE_API_URL in your frontend .env if needed.
 */
const BASE_URL =
  import.meta?.env?.VITE_API_URL?.replace(/\/+$/, '') ||
  'https://dealcross-backend-final-1aac.onrender.com';

const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * Attach Supabase JWT first; fallback to legacy localStorage token (for older flows)
 */
API.interceptors.request.use(
  async (config) => {
    try {
      const { data } = await supabase.auth.getSession();
      const sbToken = data?.session?.access_token;
      const token = sbToken || localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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

/* =========================
 * AUTH
 * =======================*/
export const register = async (data) => {
  try {
    // If you actually register with Supabase on the client,
    // you may not need this. Keeping because your backend exposes /auth/signup.
    const res = await API.post('/auth/signup', data);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const login = async (formData) => {
  try {
    // Legacy password flow (if still enabled server-side)
    const res = await API.post('/auth/login', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
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

/* =========================
 * WALLET
 * backend:
 *  - GET /wallet/my-wallet
 *  - GET /wallet/transactions
 *  - POST /wallet/fund/card?amount=..
 *  - POST /wallet/fund/bank?amount=..
 *  - POST /wallet/fund/crypto?amount=..&crypto=..
 * =======================*/
export const getWalletSummary = async () => {
  try {
    const res = await API.get('/wallet/my-wallet');
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

export const fundWalletCard = async (amount) => {
  try {
    // backend expects query param `amount`
    const res = await API.post('/wallet/fund/card', null, { params: { amount } });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const fundWalletBank = async (amount) => {
  try {
    const res = await API.post('/wallet/fund/bank', null, { params: { amount } });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const fundWalletCrypto = async (amount, crypto) => {
  try {
    const res = await API.post('/wallet/fund/crypto', null, { params: { amount, crypto } });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

/* =========================
 * KYC
 * backend:
 *  - POST /kyc/                 (KYCRequestCreate JSON)
 *  - GET  /kyc/my-kyc
 * =======================*/
export const getKYCStatus = async () => {
  try {
    const res = await API.get('/kyc/my-kyc');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

// Upload KYC: backend expects JSON (document_type, document_url)
export const uploadKYC = async ({ document_type, document_url }) => {
  try {
    const res = await API.post('/kyc/', { document_type, document_url });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

/* =========================
 * DEALS
 * backend:
 *  - GET  /deals/pairing/pending
 *  - POST /deals/pairing/confirm/{deal_id}
 *  - POST /deals/{deal_id}/fund
 *  - POST /deals/{deal_id}/deliver
 *  - POST /deals/{deal_id}/release
 *  - POST /deals/{deal_id}/dispute
 * =======================*/
export const getPendingPairings = async () => {
  try {
    const res = await API.get('/deals/pairing/pending');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const confirmPairing = async (dealId) => {
  try {
    const res = await API.post(`/deals/pairing/confirm/${dealId}`);
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

export const deliverDeal = async (dealId) => {
  try {
    const res = await API.post(`/deals/${dealId}/deliver`);
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

export const disputeDeal = async (dealId, reason, details = '') => {
  try {
    // Your disputes router expects { deal_id, reason, details }
    const res = await API.post(`/disputes/`, { deal_id: dealId, reason, details });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

/* =========================
 * SUBSCRIPTION
 * backend: POST /subscription/upgrade
 * payload: { plan, payment_method }
 * =======================*/
const upgrade = async (plan, payment_method) => {
  const payload = { plan, payment_method };
  const res = await API.post('/subscription/upgrade', payload);
  return res.data;
};

export const upgradeSubscriptionCard = async (plan) => {
  try {
    return await upgrade(plan, 'card');
  } catch (err) {
    handleError(err);
  }
};
export const upgradeSubscriptionBank = async (plan) => {
  try {
    return await upgrade(plan, 'bank');
  } catch (err) {
    handleError(err);
  }
};
export const upgradeSubscriptionCrypto = async (plan) => {
  try {
    return await upgrade(plan, 'crypto');
  } catch (err) {
    handleError(err);
  }
};

/* =========================
 * USER PROFILE / SETTINGS
 * backend:
 *  - GET  /user/profile
 *  - PUT  /user/profile/update
 *  - GET  /user/settings
 * =======================*/
export const updateProfile = async (updates) => {
  try {
    const res = await API.put('/user/profile/update', updates);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getUserSettings = async () => {
  try {
    const res = await API.get('/user/settings');
    return res.data?.data;
  } catch (err) {
    handleError(err);
  }
};

/* =========================
 * ADMIN (present in your codebase)
 * backend:
 *  - GET  /admin/users
 *  - GET  /admin/audit-logs
 *  - GET  /admin/dashboard-metrics
 *  - GET  /admin-wallet/logs
 *  - POST /admin-wallet/adjust
 *  - GET  /admin/referrals/rewards
 *  - GET  /admin/kyc/pending
 *  - POST /admin/kyc/{kyc_id}/review
 * =======================*/
export const getAllUsers = async () => {
  try {
    const res = await API.get('/admin/users');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

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
    const res = await API.get('/admin/dashboard-metrics');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getAdminWalletLogs = async () => {
  try {
    const res = await API.get('/admin-wallet/logs');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const adjustAdminWallet = async (payload) => {
  try {
    const res = await API.post('/admin-wallet/adjust', payload);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getReferralRewards = async () => {
  try {
    // routers.admin_referrals → prefix "/admin/referrals" + "/rewards"
    const res = await API.get('/admin/referrals/rewards');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getAllKYCRequests = async () => {
  try {
    // list pending
    const res = await API.get('/admin/kyc/pending');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const updateKYCStatus = async (kycId, status, note = '') => {
  try {
    // schemas.kyc_schema.KYCStatusUpdate { status, note }
    const res = await API.post(`/admin/kyc/${kycId}/review`, { status, note });
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

/* =========================
 * CHAT
 * backend:
 *  - POST /chat/send            { receiver_id, content, deal_id? }
 *  - GET  /chat/messages/{user_id}
 *  - GET  /chat/unread
 *  - POST /chat/mark-read/{user_id}
 * =======================*/
export const getChatMessages = async (userId) => {
  try {
    const res = await API.get(`/chat/messages/${userId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const sendMessage = async ({ receiverId, content, dealId = null }) => {
  try {
    const body = { receiver_id: receiverId, content };
    if (dealId) body.deal_id = dealId;
    const res = await API.post('/chat/send', body);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const markMessagesAsRead = async (userId) => {
  try {
    const res = await API.post(`/chat/mark-read/${userId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export const getUnreadMessageCount = async () => {
  try {
    const res = await API.get('/chat/unread');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

/* =========================
 * BLOGS
 * backend:
 *  - GET /blogs
 * =======================*/
export const getBlogPosts = async () => {
  try {
    const res = await API.get('/blogs');
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

/* =========================
 * BLOG DETAILS
 * backend:
 *  - GET /blogs/{id}
 * =======================*/
export const getBlogDetails = async (blogId) => {
  try {
    const res = await API.get(`/blogs/${blogId}`);
    return res.data;
  } catch (err) {
    handleError(err);
  }
};

export default API;