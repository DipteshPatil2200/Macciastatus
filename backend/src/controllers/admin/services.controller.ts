import { Request, Response, NextFunction } from 'express';
import Service, { ServiceType } from '../../models/Service';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

export const getAllServices = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { search, serviceType } = req.query;

    let query: any = {};

    if (serviceType && serviceType !== 'all') {
      query.serviceType = serviceType;
    }

    if (search) {
      query.$or = [
        { 'title.en': { $regex: search as string, $options: 'i' } },
        { 'title.mr': { $regex: search as string, $options: 'i' } },
      ];
    }

    const services = await Service.find(query).sort({ order: 1 });

    res.status(200).json({
      success: true,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

export const getServiceBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { slug } = req.params;
    const service = await Service.findOne({ slug });

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

export const createService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid service ID'));
    }

    const service = await Service.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

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

export const deleteService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError(400, 'Invalid service ID'));
    }

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return next(createError(404, 'Service not found'));
    }

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
