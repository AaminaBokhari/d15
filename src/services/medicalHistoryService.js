import api from './api';

export const getMedicalHistory = async () => {
  const response = await api.get('/medical-history');
  return response.data;
};

export const getPatientMedicalHistory = async (patientId) => {
  const response = await api.get(`/medical-history/patient/${patientId}`);
  return response.data;
};

export const createMedicalHistory = async (historyData) => {
  const response = await api.post('/medical-history', historyData);
  return response.data;
};