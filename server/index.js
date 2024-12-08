import express from 'express';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { configureApp } from './config/app.js';
import { configureRoutes } from './config/routes.js';
import connectDB from './config/database.js';
import initializeSocket from './config/socket.js';
import errorHandler from './middleware/errorHandler.js';
import validateEnv from './config/validateEnv.js';
import { logger } from './utils/logger.js';

// Load and validate environment variables
dotenv.config();
validateEnv();

const startServer = async () => {
  try {
    // Initialize express app
    const app = express();
    const httpServer = createServer(app);

    // Configure app middleware
    configureApp(app);

    // Connect to MongoDB
    await connectDB();

    // Initialize Socket.IO
    const io = initializeSocket(httpServer);

    // Add io to request object
    app.use((req, res, next) => {
      req.io = io;
      next();
    });

    // Configure routes
    configureRoutes(app);

    // Error handler
    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;
    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });

    // Graceful shutdown
    const shutdown = async () => {
      logger.info('Shutting down server...');
      await new Promise((resolve) => httpServer.close(resolve));
      process.exit(0);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

  } catch (error) {
    logger.error(`Server initialization error: ${error.message}`);
    process.exit(1);
  }
};

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled Promise Rejection: ${err.message}`);
  process.exit(1);
});

startServer();