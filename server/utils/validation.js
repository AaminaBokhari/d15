import AppError from './AppError.js';
import { isValidDate } from './dateUtils.js';

export const validateAppointmentData = (data) => {
  const { dateTime, type, patient, doctor } = data;

  if (!isValidDate(dateTime)) {
    throw new AppError('Invalid appointment date', 400);
  }

  if (!['Check-up', 'Follow-up', 'Consultation'].includes(type)) {
    throw new AppError('Invalid appointment type', 400);
  }

  if (!patient || !doctor) {
    throw new AppError('Patient and doctor IDs are required', 400);
  }
};

export const validatePrescriptionData = (data) => {
  const { patient, doctor, diagnosis, medications } = data;

  if (!patient || !doctor) {
    throw new AppError('Patient and doctor IDs are required', 400);
  }

  if (!diagnosis) {
    throw new AppError('Diagnosis is required', 400);
  }

  if (!Array.isArray(medications) || medications.length === 0) {
    throw new AppError('At least one medication is required', 400);
  }

  medications.forEach(med => {
    if (!med.name || !med.dosage) {
      throw new AppError('Medication name and dosage are required', 400);
    }
  });
};