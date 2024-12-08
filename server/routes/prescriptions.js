import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  createPrescription,
  getPrescriptions,
  getPrescriptionById
} from '../controllers/prescriptions.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getPrescriptions)
  .post(restrictTo('doctor'), createPrescription);

router.route('/:id')
  .get(getPrescriptionById);

export default router;