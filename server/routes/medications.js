import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  createMedication,
  getMedications,
  getMedicationById,
  updateMedication
} from '../controllers/medicationController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(restrictTo('doctor'), createMedication)
  .get(getMedications);

router.route('/:id')
  .get(getMedicationById)
  .patch(restrictTo('doctor'), updateMedication);

export default router;