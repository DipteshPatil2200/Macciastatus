import { Router } from 'express';
import {
  getAllGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  getAllVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from '../../controllers/admin/gallery.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/photos')
  .get(getAllGalleryItems)
  .post(createGalleryItem);

router.route('/photos/:id')
  .put(updateGalleryItem)
  .delete(deleteGalleryItem);

router.route('/videos')
  .get(getAllVideos)
  .post(createVideo);

router.route('/videos/:id')
  .put(updateVideo)
  .delete(deleteVideo);

export default router;
