import { Request, Response, NextFunction } from 'express';
import Download from '../../models/Download';
import { createError } from '../../utils/errorHandler';

export const getDownloads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, search, limit = 50 } = req.query;

    let query: any = { isActive: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { 'title.en': { $regex: search as string, $options: 'i' } },
        { 'title.mr': { $regex: search as string, $options: 'i' } },
      ];
    }

    const downloads = await Download.find(query).sort({ date: -1 }).limit(Number(limit));
    res.status(200).json({ success: true, data: downloads });
  } catch (error) {
    next(error);
  }
};
