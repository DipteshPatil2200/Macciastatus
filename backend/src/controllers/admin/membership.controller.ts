import { Request, Response, NextFunction } from 'express';
import MembershipApplication from '../../models/MembershipApplication';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllApplications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, category, search } = req.query;
    let query: any = {};

    if (status && status !== 'all') query.status = status;
    if (category && category !== 'all') query.category = category;

    if (search) {
      query.$or = [
        { fullName: { $regex: search as string, $options: 'i' } },
        { email: { $regex: search as string, $options: 'i' } },
        { companyName: { $regex: search as string, $options: 'i' } },
      ];
    }

    const applications = await MembershipApplication.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const application = await MembershipApplication.findById(id);
    if (!application) return next(createError(404, 'Application not found'));
    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));

    const application = await MembershipApplication.findByIdAndUpdate(
      id,
      { status, adminNotes },
      { new: true, runValidators: true }
    );

    if (!application) return next(createError(404, 'Application not found'));

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const application = await MembershipApplication.findByIdAndDelete(id);
    if (!application) return next(createError(404, 'Application not found'));
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
