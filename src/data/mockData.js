export const mockAppointments = [
  {
    id: 1,
    time: '09:00 AM',
    patientName: 'John Doe',
    appointmentType: 'Check-up',
    status: 'Waiting'
  },
  {
    id: 2,
    time: '09:30 AM',
    patientName: 'Jane Smith',
    appointmentType: 'Follow-up',
    status: 'In Progress'
  },
  {
    id: 3,
    time: '10:00 AM',
    patientName: 'Robert Johnson',
    appointmentType: 'Consultation',
    status: 'Scheduled'
  },
  {
    id: 4,
    time: '10:30 AM',
    patientName: 'Sarah Williams',
    appointmentType: 'Check-up',
    status: 'Waiting'
  },
  {
    id: 5,
    time: '11:00 AM',
    patientName: 'Michael Brown',
    appointmentType: 'Follow-up',
    status: 'Scheduled'
  }
];

export const mockMedicalHistory = [
  {
    id: 1,
    date: '2024-02-15',
    diagnosis: 'Common Cold',
    prescription: 'Paracetamol 500mg',
    labResults: 'Normal blood count',
    vitals: {
      bloodPressure: '120/80',
      temperature: '37.2°C',
      heartRate: '72 bpm'
    }
  },
  {
    id: 2,
    date: '2024-01-20',
    diagnosis: 'Hypertension',
    prescription: 'Amlodipine 5mg',
    labResults: 'BP: 140/90',
    vitals: {
      bloodPressure: '140/90',
      temperature: '36.8°C',
      heartRate: '78 bpm'
    }
  },
  {
    id: 3,
    date: '2023-12-10',
    diagnosis: 'Seasonal Allergies',
    prescription: 'Cetirizine 10mg',
    labResults: 'IgE levels elevated',
    vitals: {
      bloodPressure: '118/75',
      temperature: '36.9°C',
      heartRate: '70 bpm'
    }
  }
];