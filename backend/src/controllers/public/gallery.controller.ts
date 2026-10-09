import { Request, Response, NextFunction } from 'express';
import GalleryItem from '../../models/Gallery';
import Video from '../../models/Video';
import { createError } from '../../utils/errorHandler';

export const getGalleryItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, year, limit = 100 } = req.query;

    let query: any = {};

    if (category && category !== 'all') {
      query['category.en'] = category;
    }

    if (year) {
      query.year = Number(year);
    }

    const items = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 }).limit(Number(limit));
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const getVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, limit = 50 } = req.query;

    let query: any = { isActive: true };

    if (category && category !== 'all') {
      query['category.en'] = category;
    }

    const videos = await Video.find(query).sort({ createdAt: -1 }).limit(Number(limit));
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    next(error);
  }
};
