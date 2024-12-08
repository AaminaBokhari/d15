import healthRoutes from '../routes/health.js';
import authRoutes from '../routes/auth.js';
import appointmentRoutes from '../routes/appointments.js';
import prescriptionRoutes from '../routes/prescriptions.js';
import medicalHistoryRoutes from '../routes/medicalHistory.js';
import patientRoutes from '../routes/patients.js';
import chatRoutes from '../routes/chat.js';
import { notFound } from '../middleware/errorHandler.js';

export const configureRoutes = (app) => {
  // API routes
  app.use('/api/doctor/health', healthRoutes);
  app.use('/api/doctor/auth', authRoutes);
  app.use('/api/doctor/appointments', appointmentRoutes);
  app.use('/api/doctor/prescriptions', prescriptionRoutes);
  app.use('/api/doctor/medical-history', medicalHistoryRoutes);
  app.use('/api/doctor/patients', patientRoutes);
  app.use('/api/doctor/chat', chatRoutes);

  // 404 handler
  app.use(notFound);
};