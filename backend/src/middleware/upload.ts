import multer from 'multer';
import { Request } from 'express';
import { createError } from '../utils/errorHandler';
import fs from 'fs';
import path from 'path';
import { isAllowedMediaUpload } from '../utils/mediaValidation';

const uploadDirectory = path.resolve(process.cwd(), 'uploads');
fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null, uploadDirectory);
  },
  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = file.originalname.split('.').pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedImageTypes = /^(jpeg|jpg|png|webp)$/;
  const allowedDocTypes = /^(pdf|doc|docx)$/;

  const ext = file.originalname.split('.').pop()?.toLowerCase() || '';
  const isImage = allowedImageTypes.test(ext);
  const isDocument = allowedDocTypes.test(ext);

  const allowedImageMimes = ['image/jpeg', 'image/png', 'image/webp'];
  const allowedDocumentMimes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedImageMimes.includes(file.mimetype) && isImage) {
    cb(null, true);
  } else if (allowedDocumentMimes.includes(file.mimetype) && isDocument) {
    cb(null, true);
  } else {
    cb(createError(400, 'File type not supported'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter,
});

const mediaFileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const valid = isAllowedMediaUpload(file.mimetype, file.originalname);
  cb(valid ? null : createError(400, 'Only JPG, PNG, WebP, MP4 and WebM media are supported'), valid);
};

const mediaUpload = multer({ storage, limits: { fileSize: 75 * 1024 * 1024 }, fileFilter: mediaFileFilter });

export const uploadSingle = (fieldName: string) => upload.single(fieldName);
export const uploadMultiple = (fieldName: string, maxCount: number = 10) => upload.array(fieldName, maxCount);
export const uploadFields = (fields: string[]) => upload.fields(fields.map(f => ({ name: f, maxCount: 1 })));
export const uploadMediaSingle = (fieldName: string) => mediaUpload.single(fieldName);

export default upload;
