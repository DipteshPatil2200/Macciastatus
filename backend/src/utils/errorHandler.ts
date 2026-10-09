import { Request, Response, NextFunction } from 'express';
import logger from './logger';

interface CustomError extends Error {
  statusCode?: number;
}

export const createError = (statusCode: number, message: string): CustomError => {
  const error = new Error(message) as CustomError;
  error.statusCode = statusCode;
  return error;
};

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  let error = { ...err };
  error.message = err.message;

  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`);

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = createError(404, message);
  }

  if (err.name === 'MongoError' || (err as any).code === 11000) {
    const message = 'Duplicate field value entered';
    error = createError(400, message);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors).map((val: any) => val.message);
    error = createError(400, message.join(', '));
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

export default createError;
