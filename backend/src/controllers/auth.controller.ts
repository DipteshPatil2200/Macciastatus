import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import { createError } from '../utils/errorHandler';
import logger from '../utils/logger';

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const getJwtSecret = (): string => {
  if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not configured');
  return process.env.JWT_SECRET;
};

const generateToken = (userId: string, email: string, role: string): string => {
  return jwt.sign({ userId, email, role }, getJwtSecret(), { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] });
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return next(createError(400, 'Email and password are required'));
    }

    const user = await User.findOne({ email, isActive: true });

    if (!user) {
      return next(createError(401, 'Invalid credentials'));
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return next(createError(401, 'Invalid credentials'));
    }

    const token = generateToken(user._id.toString(), user.email, user.role);

    logger.info(`Admin user logged in: ${email}`);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
};

export const verifyToken = (req: Request, res: Response): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'No token provided' });
    return;
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as { userId: string; email: string; role: string };
    res.status(200).json({
      success: true,
      user: {
        userId: decoded.userId,
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

export const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { currentPassword, newPassword } = req.body;

  try {
    const userId = (req as any).user?.userId;
    if (!userId) {
      return next(createError(401, 'Not authorized'));
    }

    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, 'User not found'));
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return next(createError(400, 'Current password is incorrect'));
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};
