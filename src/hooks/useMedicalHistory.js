import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import api from '../services/api';

export function useMedicalHistory(patientId) {
  const queryClient = useQueryClient();

  const {
    data: medicalHistory,
    isLoading,
    error
  } = useQuery({
    queryKey: ['medicalHistory', patientId],
    queryFn: () => patientId 
      ? api.get(`/medical-history/patient/${patientId}`).then(res => res.data)
      : api.get('/medical-history').then(res => res.data),
    enabled: Boolean(patientId)
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.post('/medical-history', data),
    onSuccess: () => {
      queryClient.invalidateQueries(['medicalHistory']);
      toast.success('Medical history record created successfully');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create record');
    }
  });

  return {
    medicalHistory,
    isLoading,
    error,
    createRecord: createMutation.mutate
  };
}