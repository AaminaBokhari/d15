import MedicalHistory from '../models/MedicalHistory.js';

export const createMedicalHistoryService = async (historyData) => {
  return await MedicalHistory.create(historyData);
};

export const getMedicalHistoryService = async (query) => {
  return await MedicalHistory.find(query)
    .populate(['patient', 'doctor', 'prescription'])
    .sort({ date: -1 });
};

export const getPatientMedicalHistoryService = async (patientId) => {
  return await MedicalHistory.find({ patient: patientId })
    .populate(['doctor', 'prescription'])
    .sort({ date: -1 });
};

export const updateMedicalHistoryService = async (id, updateData) => {
  return await MedicalHistory.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).populate(['patient', 'doctor', 'prescription']);
};