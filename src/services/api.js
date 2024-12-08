import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: '/api/doctor',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('doctor_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('doctor_token');
      window.location.href = '/login';
    }
    
    toast.error(errorMessage);
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data
    });
  }
);

// Auth endpoints
const auth = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  verify: () => api.get('/auth/verify')
};

// Appointments endpoints
const appointments = {
  getAll: () => api.get('/appointments'),
  create: (data) => api.post('/appointments', data),
  update: (id, data) => api.patch(`/appointments/${id}`, data),
  cancel: (id, reason) => api.patch(`/appointments/${id}/cancel`, { reason }),
  reschedule: (id, dateTime) => api.patch(`/appointments/${id}/reschedule`, { dateTime })
};

// Medical history endpoints
const medicalHistory = {
  getAll: () => api.get('/medical-history'),
  getForPatient: (patientId) => api.get(`/medical-history/patient/${patientId}`),
  create: (data) => api.post('/medical-history', data)
};

// Prescriptions endpoints
const prescriptions = {
  getAll: () => api.get('/prescriptions'),
  create: (data) => api.post('/prescriptions', data),
  getById: (id) => api.get(`/prescriptions/${id}`)
};

export {
  auth,
  appointments,
  medicalHistory,
  prescriptions
};

export default api;