// File: src/api/optional.js

import API from '@/api'; // Make sure @ maps to /src in your Vite config

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

// Update user profile (username/email/password)
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

// Verify user email
export const verifyEmail = async (token) => {
  try {
    const res = await API.post('/auth/verify-email', { token });
    return res.data;
  } catch (err) {
    console.error('verifyEmail failed:', err);
    throw new Error('Email verification failed.');
  }
};