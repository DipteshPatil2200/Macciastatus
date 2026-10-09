import { Request, Response, NextFunction } from 'express';
import Testimonial from '../../models/Testimonial';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllTestimonials = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: testimonials });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const testimonial = await Testimonial.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!testimonial) return next(createError(404, 'Testimonial not found'));
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const testimonial = await Testimonial.findByIdAndDelete(id);
    if (!testimonial) return next(createError(404, 'Testimonial not found'));
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
