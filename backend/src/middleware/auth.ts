import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload, AuthRequest } from '../types';
import User from '../models/User';
import { createError } from '../utils/errorHandler';

const getJwtSecret = (): string => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
  return process.env.JWT_SECRET;
};

export const protect = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  let token: string | undefined;

  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(createError(401, 'Not authorized to access this route'));
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as UserPayload;
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return next(createError(401, 'User not found'));
    }

    if (!user.isActive) {
      return next(createError(403, 'Account has been deactivated'));
    }

    req.user = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    next();
  } catch (error) {
    return next(createError(401, 'Not authorized, token failed'));
  }
};

export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'superadmin') {
    return next(createError(403, 'Access denied. Admin privileges required.'));
  }
  next();
};

export const superAdminOnly = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'superadmin') {
    return next(createError(403, 'Access denied. Super admin privileges required.'));
  }
  next();
};
