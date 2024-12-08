import Prescription from '../models/Prescription.js';

export const createPrescriptionService = async (prescriptionData) => {
  return await Prescription.create(prescriptionData);
};

export const getPrescriptionsService = async (query) => {
  return await Prescription.find(query)
    .populate(['patient', 'doctor'])
    .sort({ date: -1 });
};

export const getPrescriptionByIdService = async (id) => {
  return await Prescription.findById(id)
    .populate(['patient', 'doctor']);
};

export const updatePrescriptionService = async (id, updateData) => {
  return await Prescription.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).populate(['patient', 'doctor']);
};