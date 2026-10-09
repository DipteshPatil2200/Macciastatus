import { Router } from 'express';
import { getGalleryItems, getVideos } from '../../controllers/public/gallery.controller';

const router = Router();

router.route('/photos').get(getGalleryItems);
router.route('/videos').get(getVideos);

export default router;
