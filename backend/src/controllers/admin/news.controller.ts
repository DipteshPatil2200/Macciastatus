import { Request, Response, NextFunction } from 'express';
import News from '../../models/News';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let query: any = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { 'title.en': { $regex: search as string, $options: 'i' } },
        { 'title.mr': { $regex: search as string, $options: 'i' } },
        { 'category.en': { $regex: search as string, $options: 'i' } },
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

export const getNewsById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid news ID'));
    }

    const news = await News.findById(id);

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

export const createNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const news = await News.create(req.body);

    res.status(201).json({
      success: true,
      data: news,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid news ID'));
    }

    const news = await News.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

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

export const deleteNews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid news ID'));
    }

    const news = await News.findByIdAndDelete(id);

    if (!news) {
      return next(createError(404, 'News not found'));
    }

    res.status(200).json({
      success: true,
      message: 'News deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
