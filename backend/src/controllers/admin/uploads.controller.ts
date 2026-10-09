import { Request, Response, NextFunction } from 'express';
import { uploadImage, uploadDocument } from '../../config/cloudinary';
import { createError } from '../../utils/errorHandler';

export const uploadImageFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      return next(createError(400, 'No file uploaded'));
    }

    const folder = req.body.folder || 'general';
    const url = await uploadImage(req.file.path, folder);

    res.status(200).json({
      success: true,
      data: {
        url,
        filename: req.file.filename,
        originalName: req.file.originalname,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadDocumentFile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.file) {
      return next(createError(400, 'No file uploaded'));
    }

    const folder = req.body.folder || 'documents';
    const url = await uploadDocument(req.file.path, folder);

    res.status(200).json({
      success: true,
      data: {
        url,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
      },
    });
  } catch (error) {
    next(error);
  }
};
