import asyncHandler from '../utils/asyncHandler.js';
import * as appointmentService from '../services/appointmentService.js';
import AppError from '../utils/AppError.js';

export const createAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.createAppointmentService({
    ...req.body,
    doctor: req.user.role === 'doctor' ? req.user.id : req.body.doctor
  });

  await appointment.populate(['patient', 'doctor']);
  res.status(201).json(appointment);
});

export const getAppointments = asyncHandler(async (req, res) => {
  const query = req.user.role === 'doctor' 
    ? { doctor: req.user.id }
    : { patient: req.user.id };

  const appointments = await appointmentService.getAppointmentsService(query);
  res.json(appointments);
});

export const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentService(
    req.params.id,
    req.body
  );

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  res.json(appointment);
});

export const cancelAppointment = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  
  if (!reason) {
    throw new AppError('Cancellation reason is required', 400);
  }

  const appointment = await appointmentService.updateAppointmentService(
    req.params.id,
    {
      status: 'Cancelled',
      cancellationReason: reason,
      cancelledAt: new Date(),
      cancelledBy: req.user.id
    }
  );

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  res.json(appointment);
});

export const rescheduleAppointment = asyncHandler(async (req, res) => {
  const { dateTime } = req.body;
  
  if (!dateTime) {
    throw new AppError('New appointment date and time are required', 400);
  }

  const appointment = await appointmentService.updateAppointmentService(
    req.params.id,
    {
      dateTime: new Date(dateTime),
      status: 'Rescheduled',
      rescheduledAt: new Date(),
      rescheduledBy: req.user.id
    }
  );

  if (!appointment) {
    throw new AppError('Appointment not found', 404);
  }

  res.json(appointment);
});