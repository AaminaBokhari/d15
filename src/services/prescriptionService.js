import api from './api';

export const getPrescriptions = async () => {
  const response = await api.get('/prescriptions');
  return response.data;
};

export const createPrescription = async (prescriptionData) => {
  const response = await api.post('/prescriptions', prescriptionData);
  return response.data;
};

export const getPrescriptionById = async (id) => {
  const response = await api.get(`/prescriptions/${id}`);
  return response.data;
};