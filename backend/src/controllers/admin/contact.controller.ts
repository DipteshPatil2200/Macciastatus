import { Request, Response, NextFunction } from 'express';
import ContactEnquiry from '../../models/ContactEnquiry';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllEnquiries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, type, search } = req.query;
    let query: any = {};

    if (status && status !== 'all') query.status = status;
    if (type && type !== 'all') query.enquiryType = type;

    if (search) {
      query.$or = [
        { name: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
        { subject: { $regex: search as string, $options: 'i' } },
      ];
    }

    const enquiries = await ContactEnquiry.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: enquiries });
  } catch (error) {
    next(error);
  }
};

export const getEnquiryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const enquiry = await ContactEnquiry.findById(id);
    if (!enquiry) return next(createError(404, 'Enquiry not found'));
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

export const updateEnquiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const enquiry = await ContactEnquiry.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!enquiry) return next(createError(404, 'Enquiry not found'));
    res.status(200).json({ success: true, data: enquiry });
  } catch (error) {
    next(error);
  }
};

export const deleteEnquiry = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const enquiry = await ContactEnquiry.findByIdAndDelete(id);
    if (!enquiry) return next(createError(404, 'Enquiry not found'));
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
