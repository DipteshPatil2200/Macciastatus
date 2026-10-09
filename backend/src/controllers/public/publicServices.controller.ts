import { Request, Response, NextFunction } from 'express';
import Service from '../../models/Service';
import { createError } from '../../utils/errorHandler';

export const getServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug, isActive: true });

    if (!service) {
      return next(createError(404, 'Service not found'));
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};
