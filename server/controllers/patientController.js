import asyncHandler from '../utils/asyncHandler.js';
import Patient from '../models/Patient.js';
import AppError from '../utils/AppError.js';

export const createPatient = asyncHandler(async (req, res) => {
  const patient = await Patient.create({
    ...req.body,
    assignedDoctor: req.user.id
  });

  res.status(201).json(patient);
});

export const getMyPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find({ assignedDoctor: req.user.id })
    .sort({ createdAt: -1 });

  res.json(patients);
});

export const getPatientById = asyncHandler(async (req, res) => {
  const patient = await Patient.findOne({
    _id: req.params.id,
    assignedDoctor: req.user.id
  });

  if (!patient) {
    throw new AppError('Patient not found', 404);
  }

  res.json(patient);
});

export const updatePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findOneAndUpdate(
    { _id: req.params.id, assignedDoctor: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!patient) {
    throw new AppError('Patient not found', 404);
  }

  res.json(patient);
});

export const deletePatient = asyncHandler(async (req, res) => {
  const patient = await Patient.findOneAndDelete({
    _id: req.params.id,
    assignedDoctor: req.user.id
  });

  if (!patient) {
    throw new AppError('Patient not found', 404);
  }

  res.status(204).json(null);
});