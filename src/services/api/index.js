import { axiosInstance } from './config';
import { setupInterceptors } from './interceptors';

// Setup interceptors
setupInterceptors(axiosInstance);

// Auth endpoints
export const auth = {
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  register: (userData) => axiosInstance.post('/auth/register', userData),
  verify: () => axiosInstance.get('/auth/verify')
};

// Appointments endpoints
export const appointments = {
  getAll: () => axiosInstance.get('/appointments'),
  create: (data) => axiosInstance.post('/appointments', data),
  update: (id, data) => axiosInstance.patch(`/appointments/${id}`, data),
  cancel: (id, reason) => axiosInstance.patch(`/appointments/${id}/cancel`, { reason }),
  reschedule: (id, dateTime) => axiosInstance.patch(`/appointments/${id}/reschedule`, { dateTime })
};

// Medical history endpoints
export const medicalHistory = {
  getAll: () => axiosInstance.get('/medical-history'),
  getForPatient: (patientId) => axiosInstance.get(`/medical-history/patient/${patientId}`),
  create: (data) => axiosInstance.post('/medical-history', data)
};

// Prescriptions endpoints
export const prescriptions = {
  getAll: () => axiosInstance.get('/prescriptions'),
  create: (data) => axiosInstance.post('/prescriptions', data),
  getById: (id) => axiosInstance.get(`/prescriptions/${id}`)
};

export default {
  auth,
  appointments,
  medicalHistory,
  prescriptions
};