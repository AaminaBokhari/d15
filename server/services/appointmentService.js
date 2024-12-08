import Appointment from '../models/Appointment.js';

export const createAppointmentService = async (appointmentData) => {
  return await Appointment.create(appointmentData);
};

export const getAppointmentsService = async (query) => {
  return await Appointment.find(query)
    .populate(['patient', 'doctor'])
    .sort({ dateTime: 1 });
};

export const updateAppointmentService = async (id, updateData) => {
  return await Appointment.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).populate(['patient', 'doctor']);
};

export const deleteAppointmentService = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};

export const getDoctorScheduleService = async (doctorId, startDate, endDate) => {
  return await Appointment.find({
    doctor: doctorId,
    dateTime: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('patient');
};