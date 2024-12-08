import api from '../services/api';
import { toast } from 'react-toastify';

export const checkBackendHealth = async () => {
  try {
    const response = await api.get('/health');
    console.log('Backend health check:', response.data);
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Backend health check failed:', error);
    toast.error('Cannot connect to server');
    return false;
  }
};

export const testMongoConnection = async () => {
  try {
    const response = await api.get('/health/db');
    console.log('Database connection:', response.data);
    return response.data.status === 'ok';
  } catch (error) {
    console.error('Database connection test failed:', error);
    toast.error('Cannot connect to database');
    return false;
  }
};