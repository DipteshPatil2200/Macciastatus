import { Request, Response, NextFunction } from 'express';
import Office from '../../models/Office';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllOffices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { type } = req.query;
    let query: any = {};
    if (type && type !== 'all') query.type = type;
    const offices = await Office.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({ success: true, data: offices });
  } catch (error) {
    next(error);
  }
};

export const getAllOfficesAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const offices = await Office.find().sort({ order: 1 });
    res.status(200).json({ success: true, data: offices });
  } catch (error) {
    next(error);
  }
};

export const createOffice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const office = await Office.create(req.body);
    res.status(201).json({ success: true, data: office });
  } catch (error) {
    next(error);
  }
};

export const updateOffice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const office = await Office.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!office) return next(createError(404, 'Office not found'));
    res.status(200).json({ success: true, data: office });
  } catch (error) {
    next(error);
  }
};

export const deleteOffice = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const office = await Office.findByIdAndDelete(id);
    if (!office) return next(createError(404, 'Office not found'));
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};
