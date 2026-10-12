import { Request, Response, NextFunction } from 'express';
import News from '../../models/News';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getPublishedNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let query: any = { status: 'published' };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { 'title.en': { $regex: search as string, $options: 'i' } },
        { 'title.mr': { $regex: search as string, $options: 'i' } },
      ];
    }

    const [news, total] = await Promise.all([
      News.find(query).sort({ displayOrder: 1, publishDate: -1 }).skip(skip).limit(Number(limit)),
      News.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: news,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getNewsBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const news = await News.findOne({ slug, status: 'published' });

    if (!news) {
      return next(createError(404, 'News not found'));
    }

    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};
