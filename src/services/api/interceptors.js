import { toast } from 'react-toastify';

export const setupInterceptors = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('doctor_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      
      if (error.response?.status === 401) {
        localStorage.removeItem('doctor_token');
        window.location.href = '/login';
      }

      toast.error(errorMessage);
      return Promise.reject(error);
    }
  );
};