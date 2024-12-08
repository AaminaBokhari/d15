import Appointment from '../../models/Appointment.js';
import { startOfDay, endOfDay } from 'date-fns';

class QueueService {
  async getTodayQueue(doctorId) {
    const today = new Date();
    return Appointment.find({
      doctor: doctorId,
      dateTime: {
        $gte: startOfDay(today),
        $lte: endOfDay(today)
      },
      status: { $ne: 'Cancelled' }
    })
    .populate('patient')
    .sort({ dateTime: 1 });
  }

  async updateQueueStatus(appointmentId, status) {
    return Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true, runValidators: true }
    ).populate(['patient', 'doctor']);
  }

  async getWaitingList(doctorId) {
    return Appointment.find({
      doctor: doctorId,
      status: 'Waiting'
    })
    .populate('patient')
    .sort({ dateTime: 1 });
  }
}

export default new QueueService();