import { v2 as cloudinary } from 'cloudinary';
import logger from '../utils/logger';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export const uploadImage = async (filePath: string, folder: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `maccia/${folder}`,
      transformation: {
        quality: 'auto',
        fetch_format: 'auto',
      },
    });
    return result.secure_url;
  } catch (error) {
    logger.error('Cloudinary image upload error:', error);
    throw new Error('Failed to upload image');
  }
};

export const uploadDocument = async (filePath: string, folder: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `maccia/${folder}`,
      resource_type: 'raw',
    });
    return result.secure_url;
  } catch (error) {
    logger.error('Cloudinary document upload error:', error);
    throw new Error('Failed to upload document');
  }
};

export const uploadMedia = async (filePath: string, folder: string, resourceType: 'image' | 'video'): Promise<{ url: string; publicId: string }> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `maccia/${folder}`,
      resource_type: resourceType,
      ...(resourceType === 'image' ? { transformation: { quality: 'auto', fetch_format: 'auto' } } : {}),
    });
    return { url: result.secure_url, publicId: result.public_id };
  } catch (error) {
    logger.error('Cloudinary media upload error:', error);
    throw new Error('Failed to upload media');
  }
};

export const deleteFile = async (publicId: string): Promise<boolean> => {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    logger.error('Cloudinary delete error:', error);
    return false;
  }
};

export default cloudinary;
