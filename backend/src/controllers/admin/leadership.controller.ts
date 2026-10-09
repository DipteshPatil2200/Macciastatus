import { Request, Response, NextFunction } from 'express';
import Leadership from '../../models/Leadership';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllLeadership = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type } = req.query;

    let query: any = {};
    if (type && type !== 'all') {
      query.type = type;
    }

    const leaders = await Leadership.find(query).sort({ order: 1, createdAt: -1 });

    res.status(200).json({
      success: true,
      data: leaders,
    });
  } catch (error) {
    next(error);
  }
};

export const createMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const member = await Leadership.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

export const updateMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid member ID'));
    }
    const member = await Leadership.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!member) return next(createError(404, 'Member not found'));
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    next(error);
  }
};

export const deleteMember = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid member ID'));
    }
    const member = await Leadership.findByIdAndDelete(id);
    if (!member) return next(createError(404, 'Member not found'));
    res.status(200).json({ success: true, message: 'Member deleted successfully' });
  } catch (error) {
    next(error);
  }
};
