import { Request, Response, NextFunction } from 'express';
import Venue from '../../models/Venue';
import VenueBooking from '../../models/VenueBooking';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getVenues = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

    if (!venue) {
      return next(createError(404, 'Venue not found'));
    }

    res.status(200).json({
      success: true,
      data: venue,
    });
  } catch (error) {
    next(error);
  }
};

export const bookVenue = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      fullName,
      company,
      email,
      mobile,
      city,
      venueId,
      venueName,
      duration,
      eventDate,
      preferredTime,
      attendees,
      description,
    } = req.body;

    // Validation
    if (!fullName || !email || !mobile || !venueId || !eventDate || !preferredTime || !attendees || !description) {
      return next(createError(400, 'Required fields missing'));
    }

    if (!mongoose.Types.ObjectId.isValid(venueId)) {
      return next(createError(400, 'Invalid venue'));
    }

    const venue = await Venue.findOne({ _id: venueId, isActive: true });
    if (!venue) return next(createError(404, 'Venue not found'));

    const requestedDate = new Date(eventDate);
    if (Number.isNaN(requestedDate.getTime()) || requestedDate <= new Date()) {
      return next(createError(400, 'Event date must be in the future'));
    }

    const overlappingBooking = await VenueBooking.exists({
      venueId,
      eventDate: requestedDate,
      preferredTime,
      status: 'confirmed',
    });
    if (overlappingBooking) {
      return next(createError(409, 'This venue is already booked for the selected date and time'));
    }

    const booking = await VenueBooking.create({
      fullName,
      company,
      email,
      mobile,
      city,
      venueId,
      venueName: venue.name.en,
      duration,
      eventDate: requestedDate,
      preferredTime,
      attendees,
      description,
    });

    res.status(201).json({
      success: true,
      message: 'Venue booking request submitted successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
