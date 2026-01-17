import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@/lib/api-client';

interface User {
  id: string;
  email?: string;
  name?: string;
  isGuest?: boolean;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkAuth = useCallback(async () => {
    const token = apiClient.getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    const result = await apiClient.getProfile();
    if (result.data) {
      setUser(result.data);
    } else {
      apiClient.logout();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email: string, password: string) => {
    setError(null);
    const result = await apiClient.login(email, password);
    
    if (result.error) {
      setError(result.error);
      return false;
    }
    
    if (result.data) {
      setUser(result.data.user);
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string, name?: string) => {
    setError(null);
    const result = await apiClient.register(email, password, name);
    
    if (result.error) {
      setError(result.error);
      return false;
    }
    
    if (result.data) {
      apiClient.setToken(result.data.token);
      setUser(result.data.user);
      return true;
    }
    
    return false;
  };

  const guestLogin = async () => {
    setError(null);
    const result = await apiClient.guestSession();
    
    if (result.error) {
      setError(result.error);
      return false;
    }
    
    if (result.data) {
      setUser(result.data.user);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    apiClient.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    login,
    register,
    guestLogin,
    logout,
  };
}
