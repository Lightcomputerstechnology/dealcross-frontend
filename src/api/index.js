import axios from 'axios';

const API_BASE = 'https://d-final.onrender.com';

// Attach the JWT token to every request
function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Fetch all users (Admin only)
 */
export async function getAllUsers() {
  const res = await axios.get(`${API_BASE}/admin/users`, {
    headers: authHeader()
  });
  return res.data.data;
}

/**
 * Ban a user by ID (Admin only)
 */
export async function banUser(userId) {
  await axios.post(
    `${API_BASE}/admin/ban/${userId}`,
    {},
    { headers: authHeader() }
  );
}

/**
 * Unban a user by ID (Admin only)
 */
export async function unbanUser(userId) {
  await axios.post(
    `${API_BASE}/admin/unban/${userId}`,
    {},
    { headers: authHeader() }
  );
}