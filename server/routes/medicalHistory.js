import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  createMedicalHistory,
  getMedicalHistory,
  getPatientMedicalHistory
} from '../controllers/medicalHistory.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMedicalHistory)
  .post(restrictTo('doctor'), createMedicalHistory);

router.get('/patient/:patientId', restrictTo('doctor'), getPatientMedicalHistory);

export default router;