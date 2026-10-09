import { Request, Response, NextFunction } from 'express';
import Partner from '../../models/Partner';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllPartners = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type } = req.query;
    let query: any = {};
    if (type && type !== 'all') query.type = type;
    const partners = await Partner.find(query).sort({ order: 1 });
    res.status(200).json({ success: true, data: partners });
  } catch (error) {
    next(error);
  }
};

export const createPartner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const partner = await Partner.create(req.body);
    res.status(201).json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
};

export const updatePartner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const partner = await Partner.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!partner) return next(createError(404, 'Partner not found'));
    res.status(200).json({ success: true, data: partner });
  } catch (error) {
    next(error);
  }
};

export const deletePartner = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const partner = await Partner.findByIdAndDelete(id);
    if (!partner) return next(createError(404, 'Partner not found'));
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
