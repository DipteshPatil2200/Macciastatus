import { Request, Response, NextFunction } from 'express';
import Event from '../../models/Event';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, eventType, category, search } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let query: any = { status: 'published' };

    if (eventType && eventType !== 'all') {
      query.eventType = eventType;
      if (eventType === 'upcoming') query.date = { $gte: new Date() };
    }

    if (category && category !== 'all') {
      query['category.en'] = category;
    }

    if (search) {
      query.$or = [
        { 'title.en': { $regex: search as string, $options: 'i' } },
        { 'title.mr': { $regex: search as string, $options: 'i' } },
      ];
    }

    const [events, total] = await Promise.all([
      Event.find(query).sort({ displayOrder: 1, date: 1 }).skip(skip).limit(Number(limit)),
      Event.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: events,
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

export const getEventBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const event = await Event.findOne({ slug, status: 'published' });

    if (!event) {
      return next(createError(404, 'Event not found'));
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid event ID'));
    }

    const event = await Event.findOne({ _id: id, status: 'published' });

    if (!event) {
      return next(createError(404, 'Event not found'));
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};
