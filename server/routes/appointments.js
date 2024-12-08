import express from 'express';
import { protect, restrictTo } from '../middleware/auth.js';
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  cancelAppointment,
  rescheduleAppointment
} from '../controllers/appointments.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getAppointments)
  .post(createAppointment);

router.route('/:id')
  .patch(updateAppointment);

router.patch('/:id/cancel', cancelAppointment);
router.patch('/:id/reschedule', rescheduleAppointment);

export default router;