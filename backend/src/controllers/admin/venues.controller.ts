import { Request, Response, NextFunction } from 'express';
import Venue from '../../models/Venue';
import VenueBooking from '../../models/VenueBooking';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllVenues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const venues = await Venue.find({ isActive: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: venues });
  } catch (error) {
    next(error);
  }
};

export const getVenueBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const venue = await Venue.findOne({ slug, isActive: true });
    if (!venue) return next(createError(404, 'Venue not found'));
    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    next(error);
  }
};

export const createVenue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json({ success: true, data: venue });
  } catch (error) {
    next(error);
  }
};

export const updateVenue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid venue ID'));
    const venue = await Venue.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!venue) return next(createError(404, 'Venue not found'));
    res.status(200).json({ success: true, data: venue });
  } catch (error) {
    next(error);
  }
};

export const deleteVenue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid venue ID'));
    const venue = await Venue.findByIdAndDelete(id);
    if (!venue) return next(createError(404, 'Venue not found'));
    res.status(200).json({ success: true, message: 'Venue deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.query;
    let query: any = {};
    if (status && status !== 'all') query.status = status;
    const bookings = await VenueBooking.find(query).populate('venueId', 'name').sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    next(error);
  }
};
