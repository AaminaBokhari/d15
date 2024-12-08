import { catchAsync } from '../utils/catchAsync.js';
import MedicalDocument from '../models/MedicalDocument.js';
import { deleteFileFromCloudinary } from '../utils/fileUpload.js';
import AppError from '../utils/AppError.js';

export const uploadDocument = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError('Please upload a file', 400);
  }

  const document = await MedicalDocument.create({
    patient: req.body.patientId,
    doctor: req.user.id,
    documentType: req.body.documentType,
    title: req.body.title,
    fileUrl: req.file.path,
    cloudinaryId: req.file.filename,
    notes: req.body.notes
  });

  res.status(201).json(document);
});

export const getDocuments = catchAsync(async (req, res) => {
  const documents = await MedicalDocument.find({
    $or: [
      { patient: req.user.id },
      { doctor: req.user.id }
    ]
  }).populate('patient doctor');

  res.json(documents);
});

export const deleteDocument = catchAsync(async (req, res) => {
  const document = await MedicalDocument.findById(req.params.id);
  
  if (!document) {
    throw new AppError('Document not found', 404);
  }

  if (document.doctor.toString() !== req.user.id) {
    throw new AppError('Not authorized to delete this document', 403);
  }

  await deleteFileFromCloudinary(document.cloudinaryId);
  await document.remove();

  res.status(204).json(null);
});