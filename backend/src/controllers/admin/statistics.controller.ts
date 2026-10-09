import { Request, Response, NextFunction } from 'express';
import Statistic from '../../models/Statistic';
import { createError } from '../../utils/errorHandler';

const DEFAULT_STATISTICS = [
  {
    label: { en: 'Years of Experience', mr: 'वर्षे अनुभव' },
    value: 57,
    suffix: '+',
    order: 0,
    isActive: true,
  },
  {
    label: { en: 'Trade & Industry Associations', mr: 'ट्रेड आणि उद्योग संघटना' },
    value: 300,
    suffix: '+',
    order: 1,
    isActive: true,
  },
  {
    label: { en: 'Direct Members', mr: 'थेट सदस्य' },
    value: 12000,
    suffix: '+',
    order: 2,
    isActive: true,
  },
  {
    label: { en: 'Trade & Industrial Entities', mr: 'ट्रेड आणि उद्योगिक संस्था' },
    value: 1500,
    suffix: '+',
    order: 3,
    isActive: true,
  },
];

export const getStatistics = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let stats = await Statistic.find({ isActive: true }).sort({ order: 1 });

    if (stats.length === 0) {
      stats = DEFAULT_STATISTICS as any;
    }

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getStatisticsAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stats = await Statistic.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const createStatistic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stat = await Statistic.create(req.body);
    res.status(201).json({
      success: true,
      data: stat,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatistic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const stat = await Statistic.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

    if (!stat) {
      return next(createError(404, 'Statistic not found'));
    }

    res.status(200).json({
      success: true,
      data: stat,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteStatistic = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const stat = await Statistic.findByIdAndDelete(id);

    if (!stat) {
      return next(createError(404, 'Statistic not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Statistic deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
