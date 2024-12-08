import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { appointments } from '../services/api';
import { toast } from 'react-toastify';

export function useAppointments() {
  const queryClient = useQueryClient();

  const {
    data: appointmentList,
    isLoading,
    error
  } = useQuery({
    queryKey: ['appointments'],
    queryFn: appointments.getAll
  });

  const createMutation = useMutation({
    mutationFn: appointments.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast.success('Appointment created successfully');
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => appointments.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast.success('Appointment updated successfully');
    }
  });

  const cancelMutation = useMutation({
    mutationFn: ({ id, reason }) => appointments.cancel(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast.success('Appointment cancelled successfully');
    }
  });

  const rescheduleMutation = useMutation({
    mutationFn: ({ id, dateTime }) => appointments.reschedule(id, dateTime),
    onSuccess: () => {
      queryClient.invalidateQueries(['appointments']);
      toast.success('Appointment rescheduled successfully');
    }
  });

  return {
    appointments: appointmentList?.data || [],
    isLoading,
    error,
    createAppointment: createMutation.mutate,
    updateAppointment: updateMutation.mutate,
    cancelAppointment: cancelMutation.mutate,
    rescheduleAppointment: rescheduleMutation.mutate
  };
}