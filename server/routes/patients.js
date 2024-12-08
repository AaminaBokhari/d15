import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  createPatient,
  getMyPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from '../controllers/patientController.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getMyPatients)
  .post(createPatient);

router.route('/:id')
  .get(getPatientById)
  .patch(updatePatient)
  .delete(deletePatient);

export default router;