import { Request, Response, NextFunction } from 'express';
import Newsletter from '../../models/Newsletter';
import { createError } from '../../utils/errorHandler';

export const subscribe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, name, preferences } = req.body;

    if (!email) {
      return next(createError(400, 'Email is required'));
    }

    const existing = await Newsletter.findOne({ email });

    if (existing && existing.isActive) {
      res.status(200).json({
        success: true,
        message: 'You are already subscribed to our newsletter',
        data: existing,
      });
      return;
    }

    if (existing && !existing.isActive) {
      await Newsletter.findByIdAndUpdate(existing._id, { isActive: true, name: name || '', preferences: preferences || undefined });
      res.status(200).json({
        success: true,
        message: 'You have been subscribed to our newsletter',
      });
      return;
    }

    const subscription = await Newsletter.create({ email, name, preferences });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const unsubscribe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(createError(400, 'Email is required'));
    }

    const subscription = await Newsletter.findOneAndUpdate(
      { email },
      { isActive: false },
      { new: true }
    );

    if (!subscription) {
      return next(createError(404, 'Subscription not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed',
    });
  } catch (error) {
    next(error);
  }
};
