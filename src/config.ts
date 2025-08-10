import axios from 'axios';
import type { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: 'https://ai-recruiter-backend-7.onrender.com',
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor to handle 401 and 403
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401) {
      //alert("Session expired or unauthorized. Please log in again.");
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    if (status === 403) {
      //alert("Access denied. You do not have permission to access this resource.");
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
