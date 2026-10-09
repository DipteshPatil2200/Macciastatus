import { Request, Response, NextFunction } from 'express';
import Download from '../../models/Download';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllDownloads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, search } = req.query;
    let query: any = {};

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { 'title.en': { $regex: search as string, $options: 'i' } },
        { 'title.mr': { $regex: search as string, $options: 'i' } },
      ];
    }

    const downloads = await Download.find(query).sort({ date: -1 });
    res.status(200).json({ success: true, data: downloads });
  } catch (error) {
    next(error);
  }
};

export const createDownload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const download = await Download.create(req.body);
    res.status(201).json({ success: true, data: download });
  } catch (error) {
    next(error);
  }
};

export const updateDownload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const download = await Download.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!download) return next(createError(404, 'Download not found'));
    res.status(200).json({ success: true, data: download });
  } catch (error) {
    next(error);
  }
};

export const deleteDownload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const download = await Download.findByIdAndDelete(id);
    if (!download) return next(createError(404, 'Download not found'));
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
