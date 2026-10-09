import { Request, Response, NextFunction } from 'express';
import Event from '../../models/Event';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllEvents = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { page = 1, limit = 10, status, search, eventType } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    let query: any = {};

    if (status && status !== 'all') {
      query.status = status;
    }

    if (eventType && eventType !== 'all') {
      query.eventType = eventType;
    }

    if (search) {
      query.$or = [
        { 'title.en': { $regex: search as string, $options: 'i' } },
        { 'title.mr': { $regex: search as string, $options: 'i' } },
        { 'category.en': { $regex: search as string, $options: 'i' } },
      ];
    }

    const [events, total] = await Promise.all([
      Event.find(query).sort({ date: -1 }).skip(skip).limit(Number(limit)),
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

export const getEventById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid event ID'));
    }

    const event = await Event.findById(id);

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

export const createEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid event ID'));
    }

    const event = await Event.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

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

export const deleteEvent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid event ID'));
    }

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return next(createError(404, 'Event not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
