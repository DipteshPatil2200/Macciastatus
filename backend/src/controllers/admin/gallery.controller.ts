import { Request, Response, NextFunction } from 'express';
import GalleryItem from '../../models/Gallery';
import Video from '../../models/Video';
import { createError } from '../../utils/errorHandler';
import mongoose from 'mongoose';

// Gallery
export const getAllGalleryItems = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category, year } = req.query;
    let query: any = {};
    if (category) query['category.en'] = category;
    if (year) query.year = Number(year);
    const items = await GalleryItem.find(query).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    next(error);
  }
};

export const createGalleryItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const item = await GalleryItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateGalleryItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const item = await GalleryItem.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!item) return next(createError(404, 'Gallery item not found'));
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const deleteGalleryItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const item = await GalleryItem.findByIdAndDelete(id);
    if (!item) return next(createError(404, 'Gallery item not found'));
    res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

// Videos
export const getAllVideos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { category } = req.query;
    let query: any = {};
    if (category) query['category.en'] = category;
    const videos = await Video.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const video = await Video.create(req.body);
    res.status(201).json({ success: true, data: video });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const video = await Video.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!video) return next(createError(404, 'Video not found'));
    res.status(200).json({ success: true, data: video });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return next(createError(400, 'Invalid ID'));
    const video = await Video.findByIdAndDelete(id);
    if (!video) return next(createError(404, 'Video not found'));
    res.status(200).json({ success: true, message: 'Video deleted successfully' });
  } catch (error) {
    next(error);
  }
};
