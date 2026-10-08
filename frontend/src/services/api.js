import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 Unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    return Promise.reject(error);
  }
);

export default api;

// Authentication Services
export const authService = {
  register: async (userData) => {
    const res = await api.post('/auth/register', userData);
    return res.data;
  },
  login: async (credentials) => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },
  getProfile: async () => {
    const res = await api.get('/auth/profile');
    return res.data;
  },
  verifyEmail: async (token) => {
    const res = await api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`);
    return res.data;
  },
  resendVerification: async (email) => {
    const res = await api.post('/auth/resend-verification', { email });
    return res.data;
  },
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const res = await api.post('/auth/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

// Resume Management Services
export const resumeService = {
  getAllResumes: async () => {
    const res = await api.get('/resumes');
    return res.data;
  },
  getResumeById: async (id) => {
    const res = await api.get(`/resumes/${id}`);
    return res.data;
  },
  createResume: async (title) => {
    const res = await api.post('/resumes', { title });
    return res.data;
  },
  updateResume: async (id, resumeData) => {
    const res = await api.put(`/resumes/${id}`, resumeData);
    return res.data;
  },
  deleteResume: async (id) => {
    const res = await api.delete(`/resumes/${id}`);
    return res.data;
  },
  uploadResumeImages: async (id, { thumbnail, profileImage }) => {
    const formData = new FormData();
    if (thumbnail) {
      formData.append('thumbnail', thumbnail);
    }
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }
    const res = await api.put(`/resumes/${id}/upload-images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

// Templates Service
export const templateService = {
  getTemplates: async () => {
    const res = await api.get('/templates');
    return res.data;
  },
};

// Payment & Subscription Services
export const paymentService = {
  createOrder: async (planType = 'premium') => {
    const res = await api.post('/payment/create-order', { planType });
    return res.data;
  },
  verifyPayment: async (paymentData) => {
    const res = await api.post('/payment/verify', paymentData);
    return res.data;
  },
  simulateSuccess: async (orderId) => {
    const res = await api.post('/payment/simulate-success', { orderId });
    return res.data;
  },
  verifyPaymentRedirect: async (queryParams) => {
    const res = await api.get(`/payment/verify`, { params: queryParams });
    return res.data;
  },
  paymentFailure: async (orderId) => {
    const res = await api.get(`/payment/failure`, { params: { transaction_uuid: orderId } });
    return res.data;
  },
  getPaymentHistory: async () => {
    const res = await api.get('/payment/history');
    return res.data;
  },
  getOrderDetails: async (orderId) => {
    const res = await api.get(`/payment/order/${orderId}`);
    return res.data;
  },
};
