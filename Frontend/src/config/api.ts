import axios from 'axios';

// Backend API URL - your Spring Boot server
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000, // 5 seconds timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
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
    // Handle network errors
    if (!error.response) {
      console.warn('Network Error - API server may not be running:', error.message);
      return Promise.reject({
        message: 'Backend server is not available. Using offline mode.',
        status: 0,
        isNetworkError: true
      });
    }

    // Handle HTTP errors
    const { status, data } = error.response;
    
    switch (status) {
      case 401:
        // Don't automatically logout on 401, let components handle it
        console.warn('Authentication failed');
        break;
      case 403:
        console.error('Access forbidden');
        break;
      case 404:
        console.error('Resource not found');
        break;
      case 500:
        console.error('Internal server error');
        break;
      default:
        console.error('API Error:', data?.message || error.message);
    }
    
    return Promise.reject({
      message: data?.message || 'An error occurred',
      status,
      data
    });
  }
);

export default api;