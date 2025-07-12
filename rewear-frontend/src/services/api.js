import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('rewear_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('rewear_token');
      localStorage.removeItem('rewear_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};

// User endpoints
export const userAPI = {
  getProfile: () => api.get('/user/profile'),
  updateProfile: (data) => api.put('/user/profile', data),
  getUserStats: () => api.get('/user/stats'),
};

// Items endpoints
export const itemsAPI = {
  getItems: (params) => api.get('/items', { params }),
  getUserItems: () => api.get('/items/user'),
  createItem: (itemData) => api.post('/items', itemData),
  updateItem: (id, itemData) => api.put(`/items/${id}`, itemData),
  deleteItem: (id) => api.delete(`/items/${id}`),
  getFeaturedItems: () => api.get('/items/featured'),
};

// Swaps endpoints
export const swapsAPI = {
  getUserSwaps: () => api.get('/swaps/user'),
  createSwap: (swapData) => api.post('/swaps', swapData),
  updateSwapStatus: (id, status) => api.put(`/swaps/${id}/status`, { status }),
  rateSwap: (id, rating) => api.post(`/swaps/${id}/rate`, { rating }),
};

export default api;
