import { Request, Response, NextFunction } from 'express';
import Committee from '../../models/Committee';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllCommittees = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type } = req.query;
    let query: any = {};
    if (type && type !== 'all') query.type = type;
    const committees = await Committee.find(query).sort({ type: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: committees });
  } catch (error) {
    next(error);
  }
};

export const getCommitteeBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const committee = await Committee.findOne({ slug });
    if (!committee) return next(createError(404, 'Committee not found'));
    res.status(200).json({ success: true, data: committee });
  } catch (error) {
    next(error);
  }
};

export const createCommittee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const committee = await Committee.create(req.body);
    res.status(201).json({ success: true, data: committee });
  } catch (error) {
    next(error);
  }
};

export const updateCommittee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const committee = await Committee.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!committee) return next(createError(404, 'Committee not found'));
    res.status(200).json({ success: true, data: committee });
  } catch (error) {
    next(error);
  }
};

export const deleteCommittee = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const committee = await Committee.findByIdAndDelete(id);
    if (!committee) return next(createError(404, 'Committee not found'));
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
