// File: src/api.js
import axios from 'axios';
import { supabase } from './lib/supabase';

const BASE_URL =
  import.meta?.env?.VITE_API_URL?.replace(/\/+$/, '') ||
  'https://dealcross-backend-final-1aac.onrender.com';

const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach Supabase JWT first; fallback to legacy localStorage token
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
  try { const res = await API.post('/auth/signup', data); return res.data; } catch (err) { handleError(err); }
};
export const login = async (formData) => {
  try { const res = await API.post('/auth/login', formData, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }); return res.data; } catch (err) { handleError(err); }
};
export const getCurrentUser = async () => { try { const res = await API.get('/auth/me'); return res.data; } catch (err) { handleError(err); } };

/* =========================
 * WALLET
 * =======================*/
export const getWalletSummary = async () => { try { const res = await API.get('/wallet/my-wallet'); return res.data; } catch (err) { handleError(err); } };
export const getWalletHistory = async () => { try { const res = await API.get('/wallet/transactions'); return res.data; } catch (err) { handleError(err); } };
export const fundWalletCard = async (amount) => { try { const res = await API.post('/wallet/fund/card', null, { params: { amount } }); return res.data; } catch (err) { handleError(err); } };
export const fundWalletBank = async (amount) => { try { const res = await API.post('/wallet/fund/bank', null, { params: { amount } }); return res.data; } catch (err) { handleError(err); } };
export const fundWalletCrypto = async (amount, crypto) => { try { const res = await API.post('/wallet/fund/crypto', null, { params: { amount, crypto } }); return res.data; } catch (err) { handleError(err); } };

/* =========================
 * KYC
 * =======================*/
export const getKYCStatus = async () => { try { const res = await API.get('/kyc/my-kyc'); return res.data; } catch (err) { handleError(err); } };
export const uploadKYC = async ({ document_type, document_url }) => { try { const res = await API.post('/kyc/', { document_type, document_url }); return res.data; } catch (err) { handleError(err); } };

/* =========================
 * DEALS
 * =======================*/
export const getPendingPairings = async () => { try { const res = await API.get('/deals/pairing/pending'); return res.data; } catch (err) { handleError(err); } };
export const confirmPairing = async (dealId) => { try { const res = await API.post(`/deals/pairing/confirm/${dealId}`); return res.data; } catch (err) { handleError(err); } };
export const fundDeal = async (dealId) => { try { const res = await API.post(`/deals/${dealId}/fund`); return res.data; } catch (err) { handleError(err); } };
export const deliverDeal = async (dealId) => { try { const res = await API.post(`/deals/${dealId}/deliver`); return res.data; } catch (err) { handleError(err); } };
export const releaseDeal = async (dealId) => { try { const res = await API.post(`/deals/${dealId}/release`); return res.data; } catch (err) { handleError(err); } };
export const disputeDeal = async (dealId, reason, details = '') => { try { const res = await API.post(`/disputes/`, { deal_id: dealId, reason, details }); return res.data; } catch (err) { handleError(err); } };
export const getConfirmedPairing = async (dealId) => { try { const res = await API.get(`/deals/confirmed/${dealId}`); return res.data; } catch (err) { handleError(err); } };
export const getDealDetails = async (dealId) => { try { const res = await API.get(`/deals/${dealId}`); return res.data; } catch (err) { handleError(err); } };
export const getMyDeals = async () => { try { const res = await API.get('/deals/my'); return res.data; } catch (err) { handleError(err); } };

/* =========================
 * SUBSCRIPTION
 * =======================*/
const upgrade = async (plan, payment_method) => { const res = await API.post('/subscription/upgrade', { plan, payment_method }); return res.data; };
export const upgradeSubscriptionCard = async (plan) => { try { return await upgrade(plan, 'card'); } catch (err) { handleError(err); } };
export const upgradeSubscriptionBank = async (plan) => { try { return await upgrade(plan, 'bank'); } catch (err) { handleError(err); } };
export const upgradeSubscriptionCrypto = async (plan) => { try { return await upgrade(plan, 'crypto'); } catch (err) { handleError(err); } };

/* =========================
 * USER PROFILE / SETTINGS
 * =======================*/
export const updateProfile = async (updates) => { try { const res = await API.put('/user/profile/update', updates); return res.data; } catch (err) { handleError(err); } };
export const getUserSettings = async () => { try { const res = await API.get('/user/settings'); return res.data?.data; } catch (err) { handleError(err); } };

/* =========================
 * ADMIN
 * =======================*/
export const getAllUsers = async () => { try { const res = await API.get('/admin/users'); return res.data; } catch (err) { handleError(err); } };
export const getAuditLogs = async () => { try { const res = await API.get('/admin/audit-logs'); return res.data; } catch (err) { handleError(err); } };
export const getAdminMetrics = async () => { try { const res = await API.get('/admin/dashboard-metrics'); return res.data; } catch (err) { handleError(err); } };
export const getAdminWalletLogs = async () => { try { const res = await API.get('/admin-wallet/logs'); return res.data; } catch (err) { handleError(err); } };
export const adjustAdminWallet = async (payload) => { try { const res = await API.post('/admin-wallet/adjust', payload); return res.data; } catch (err) { handleError(err); } };
export const getReferralRewards = async () => { try { const res = await API.get('/admin/referrals/rewards'); return res.data; } catch (err) { handleError(err); } };
export const getAllKYCRequests = async () => { try { const res = await API.get('/admin/kyc/pending'); return res.data; } catch (err) { handleError(err); } };
export const updateKYCStatus = async (kycId, status, note = '') => { try { const res = await API.post(`/admin/kyc/${kycId}/review`, { status, note }); return res.data; } catch (err) { handleError(err); } };

/* =========================
 * CHAT
 * =======================*/
export const getChatMessages = async (userId) => { try { const res = await API.get(`/chat/messages/${userId}`); return res.data; } catch (err) { handleError(err); } };
export const sendMessage = async ({ receiverId, content, dealId = null }) => { try { const body = { receiver_id: receiverId, content }; if (dealId) body.deal_id = dealId; const res = await API.post('/chat/send', body); return res.data; } catch (err) { handleError(err); } };
export const markMessagesAsRead = async (userId) => { try { const res = await API.post(`/chat/mark-read/${userId}`); return res.data; } catch (err) { handleError(err); } };
export const getUnreadMessageCount = async () => { try { const res = await API.get('/chat/unread'); return res.data; } catch (err) { handleError(err); } };

/* =========================
 * BLOGS
 * =======================*/
export const getBlogPosts = async () => { try { const res = await API.get('/blogs'); return res.data; } catch (err) { handleError(err); } };
export const getBlogDetails = async (blogId) => { try { const res = await API.get(`/blogs/${blogId}`); return res.data; } catch (err) { handleError(err); } };

export default API;