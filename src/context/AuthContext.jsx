import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('doctor_token');
      if (token) {
        const { user } = await auth.verify();
        setUser(user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('doctor_token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    try {
      const { token, user } = await auth.login(credentials);
      localStorage.setItem('doctor_token', token);
      setUser(user);
      toast.success('Login successful!');
      navigate('/');
      return user;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { token, user } = await auth.register(userData);
      localStorage.setItem('doctor_token', token);
      setUser(user);
      toast.success('Registration successful!');
      navigate('/');
      return user;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('doctor_token');
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};