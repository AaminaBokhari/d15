import Appointment from '../../models/Appointment.js';
import AppError from '../../utils/AppError.js';
import { validateTimeSlot } from './scheduleService.js';

class AppointmentService {
  async create(appointmentData) {
    const isSlotAvailable = await validateTimeSlot(
      appointmentData.doctor,
      appointmentData.dateTime
    );

    if (!isSlotAvailable) {
      throw new AppError('Time slot is not available', 400);
    }

    const appointment = await Appointment.create(appointmentData);
    return appointment.populate(['patient', 'doctor']);
  }

  async getAll(query) {
    return Appointment.find(query)
      .populate(['patient', 'doctor'])
      .sort({ dateTime: 1 });
  }

  async update(id, updateData) {
    if (updateData.dateTime) {
      const isSlotAvailable = await validateTimeSlot(
        updateData.doctor,
        updateData.dateTime,
        id
      );

      if (!isSlotAvailable) {
        throw new AppError('Time slot is not available', 400);
      }
    }

    return Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate(['patient', 'doctor']);
  }

  async delete(id) {
    return Appointment.findByIdAndDelete(id);
  }
}

export default new AppointmentService();