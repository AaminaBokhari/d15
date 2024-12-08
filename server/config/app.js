import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { apiLimiter } from '../middleware/rateLimiter.js';
import { logger } from '../utils/logger.js';

export const configureApp = (app) => {
  // Trust proxy - required for rate limiter
  app.enable('trust proxy');
  
  // Security middleware
  app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  
  app.use(express.json());
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }
  }));
  
  app.use(compression());

  // Logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  // Custom logging middleware
  app.use((req, res, next) => {
    res.on('finish', () => {
      logger.info(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    });
    next();
  });

  // Rate limiting
  app.use('/api/', apiLimiter);
};