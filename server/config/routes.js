import healthRoutes from '../routes/health.js';
import authRoutes from '../routes/auth.js';
import appointmentRoutes from '../routes/appointments.js';
import prescriptionRoutes from '../routes/prescriptions.js';
import medicalHistoryRoutes from '../routes/medicalHistory.js';
import patientRoutes from '../routes/patients.js';
import chatRoutes from '../routes/chat.js';
import { errorHandler, notFound } from '../middleware/errorHandler.js';

export const configureRoutes = (app) => {
  // API routes
  app.use('/api/health', healthRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/prescriptions', prescriptionRoutes);
  app.use('/api/medical-history', medicalHistoryRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/chat', chatRoutes);

  // Error handlers - MOVED HERE
  app.use(notFound);
  app.use(errorHandler);
};