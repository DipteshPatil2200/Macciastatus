import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';
import logger from './utils/logger';

dotenv.config();

const requiredEnvironment = ['MONGODB_URI', 'JWT_SECRET'] as const;

const validateEnvironment = (): void => {
  const missing = requiredEnvironment.filter((key) => !process.env[key]?.trim());
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  if ((process.env.JWT_SECRET?.length || 0) < 32) {
    throw new Error('JWT_SECRET must be at least 32 characters long');
  }
};

const PORT = Number(process.env.PORT || 5000);

const startServer = async (): Promise<void> => {
  try {
    validateEnvironment();
    await mongoose.connect(process.env.MONGODB_URI as string);
    logger.info('MongoDB connected successfully');

    app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
