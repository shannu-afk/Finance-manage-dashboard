import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Account APIs
export const accountAPI = {
  getAccounts: () => api.get('/accounts'),
  createAccount: (data) => api.post('/accounts', data),
  updateAccount: (id, data) => api.put(`/accounts/${id}`, data),
  deleteAccount: (id) => api.delete(`/accounts/${id}`),
  getTotalBalance: () => api.get('/accounts/balance/total'),
};

// Transaction APIs
export const transactionAPI = {
  getTransactions: (params) => api.get('/accounts/transactions/all', { params }),
  createTransaction: (data) => api.post('/accounts/transactions', data),
  updateTransaction: (id, data) => api.put(`/accounts/transactions/${id}`, data),
  deleteTransaction: (id) => api.delete(`/accounts/transactions/${id}`),
  getSpendingByCategory: (params) => api.get('/accounts/analytics/spending', { params }),
  getMonthlyTrend: (params) => api.get('/accounts/analytics/trend', { params }),
};

// Analytics APIs
export const analyticsAPI = {
  getSpendingByCategory: (params) => api.get('/accounts/analytics/spending', { params }),
  getMonthlyTrend: (params) => api.get('/accounts/analytics/trend', { params }),
};

export default api;
