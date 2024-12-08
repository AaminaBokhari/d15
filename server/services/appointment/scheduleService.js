import Appointment from '../../models/Appointment.js';
import { addMinutes, isWithinInterval } from 'date-fns';

class ScheduleService {
  async validateTimeSlot(doctorId, dateTime, excludeAppointmentId = null) {
    const appointmentDuration = 30; // minutes
    const proposedStart = new Date(dateTime);
    const proposedEnd = addMinutes(proposedStart, appointmentDuration);

    const query = {
      doctor: doctorId,
      dateTime: {
        $lt: proposedEnd,
        $gt: proposedStart
      },
      status: { $ne: 'Cancelled' }
    };

    if (excludeAppointmentId) {
      query._id = { $ne: excludeAppointmentId };
    }

    const conflictingAppointment = await Appointment.findOne(query);
    return !conflictingAppointment;
  }

  async getDoctorSchedule(doctorId, startDate, endDate) {
    return Appointment.find({
      doctor: doctorId,
      dateTime: {
        $gte: startDate,
        $lte: endDate
      }
    }).populate('patient');
  }

  async getAvailableSlots(doctorId, date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(9, 0, 0, 0); // Clinic opens at 9 AM

    const endOfDay = new Date(date);
    endOfDay.setHours(17, 0, 0, 0); // Clinic closes at 5 PM

    const appointments = await Appointment.find({
      doctor: doctorId,
      dateTime: {
        $gte: startOfDay,
        $lte: endOfDay
      },
      status: { $ne: 'Cancelled' }
    });

    const slots = [];
    let currentSlot = startOfDay;

    while (currentSlot < endOfDay) {
      const slotEnd = addMinutes(currentSlot, 30);
      
      const isBooked = appointments.some(apt => 
        isWithinInterval(new Date(apt.dateTime), {
          start: currentSlot,
          end: slotEnd
        })
      );

      if (!isBooked) {
        slots.push(new Date(currentSlot));
      }

      currentSlot = slotEnd;
    }

    return slots;
  }
}

export default new ScheduleService();