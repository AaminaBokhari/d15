import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import { logger } from '../utils/logger.js';

dotenv.config();

const seedData = {
  users: [
    {
      name: 'Dr. John Smith',
      email: 'john.smith@clinic.com',
      password: 'password123',
      role: 'doctor',
      specialization: 'General Medicine',
      licenseNumber: 'MD12345'
    },
    {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      role: 'patient'
    }
  ]
};

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    logger.info('Cleared existing users');

    // Insert new data
    const users = await User.create(seedData.users);
    logger.info(`Inserted ${users.length} users`);

    await mongoose.connection.close();
    logger.info('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();