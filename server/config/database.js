import mongoose from 'mongoose';
import { logger } from '../utils/logger.js';

const connectDB = async () => {
  try {
    // Add connection options to handle deprecation warnings and improve reliability
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'doctor_panel',
      connectTimeoutMS: 10000, // 10 seconds
      socketTimeoutMS: 45000, // 45 seconds
      // Add recommended options
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 1000,
      retryWrites: true,
      w: 'majority'
    });
    
    // Add connection event handlers
    mongoose.connection.on('connected', () => {
      logger.info(`MongoDB Connected: ${conn.connection.host}`);
    });

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB Error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB Disconnected');
    });

    // Handle application termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });

    return conn;
  } catch (error) {
    logger.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;