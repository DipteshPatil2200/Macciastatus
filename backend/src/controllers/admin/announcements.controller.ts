import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Announcement from '../../models/Announcement';
import { createError } from '../../utils/errorHandler';

export const getAnnouncements = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try { res.json({ success: true, data: await Announcement.find().sort({ priority: -1, createdAt: -1 }) }); }
  catch (error) { next(error); }
};

export const createAnnouncement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try { res.status(201).json({ success: true, data: await Announcement.create(req.body) }); }
  catch (error) { next(error); }
};

export const updateAnnouncement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(createError(400, 'Invalid announcement ID'));
    const record = await Announcement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!record) return next(createError(404, 'Announcement not found'));
    res.json({ success: true, data: record });
  } catch (error) { next(error); }
};

export const deleteAnnouncement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) return next(createError(400, 'Invalid announcement ID'));
    const record = await Announcement.findByIdAndDelete(req.params.id);
    if (!record) return next(createError(404, 'Announcement not found'));
    res.json({ success: true, message: 'Announcement deleted' });
  } catch (error) { next(error); }
};
