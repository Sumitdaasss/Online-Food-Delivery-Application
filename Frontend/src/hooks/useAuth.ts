import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/authService';
import { mockAuthService } from '../services/mockServices';
import { User, LoginRequest, RegisterRequest } from '../types';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      try {
        // Try real API first
        return await authService.login(credentials);
      } catch (error: any) {
        console.warn('API not available, using mock auth:', error.message);
        // Fall back to mock authentication
        return await mockAuthService.login(credentials);
      }
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success('Login successful!');
    },
    onError: (error: any) => {
      const message = error.message || 'Login failed. Please check your credentials.';
      toast.error(message);
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterRequest) => {
      try {
        return await authService.register(userData);
      } catch (error: any) {
        console.warn('API not available, using mock auth:', error.message);
        return await mockAuthService.register(userData);
      }
    },
    onSuccess: (data) => {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAuthenticated(true);
      toast.success('Registration successful!');
    },
    onError: (error: any) => {
      const message = error.message || 'Registration failed. Please try again.';
      toast.error(message);
    }
  });

  const logout = () => {
    try {
      authService.logout();
    } catch (error) {
      // Even if API logout fails, clear local data
      console.warn('API logout failed, clearing local data');
    }
    
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    queryClient.clear();
    toast.success('Logged out successfully');
  };

  return {
    user,
    isAuthenticated,
    loading,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending
  };
};