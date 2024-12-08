import api from './api';

export const getAppointments = async () => {
  const response = await api.get('/appointments');
  return response.data;
};

export const createAppointment = async (appointmentData) => {
  const response = await api.post('/appointments', appointmentData);
  return response.data;
};

export const updateAppointment = async (id, updateData) => {
  const response = await api.patch(`/appointments/${id}`, updateData);
  return response.data;
};

export const cancelAppointment = async (id, reason) => {
  const response = await api.patch(`/appointments/${id}/cancel`, { reason });
  return response.data;
};

export const rescheduleAppointment = async (id, newDateTime) => {
  const response = await api.patch(`/appointments/${id}/reschedule`, { dateTime: newDateTime });
  return response.data;
};

export const getDoctorSchedule = async (startDate, endDate) => {
  const response = await api.get('/appointments/schedule', {
    params: { startDate, endDate }
  });
  return response.data;
};