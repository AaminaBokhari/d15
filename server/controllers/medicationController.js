import { catchAsync } from '../utils/catchAsync.js';
import Medication from '../models/Medication.js';
import AppError from '../utils/AppError.js';

export const createMedication = catchAsync(async (req, res) => {
  const medication = await Medication.create(req.body);
  res.status(201).json(medication);
});

export const getMedications = catchAsync(async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;
  
  const query = {};
  
  if (search) {
    query.$text = { $search: search };
  }
  
  if (category) {
    query.category = category;
  }

  const medications = await Medication.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .sort({ name: 1 });

  const total = await Medication.countDocuments(query);

  res.json({
    medications,
    total,
    pages: Math.ceil(total / limit),
    currentPage: parseInt(page)
  });
});

export const getMedicationById = catchAsync(async (req, res) => {
  const medication = await Medication.findById(req.params.id);
  
  if (!medication) {
    throw new AppError('Medication not found', 404);
  }

  res.json(medication);
});

export const updateMedication = catchAsync(async (req, res) => {
  const medication = await Medication.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  if (!medication) {
    throw new AppError('Medication not found', 404);
  }

  res.json(medication);
});