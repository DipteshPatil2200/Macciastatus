import { Router } from 'express';
import { getNewsBySlug, getPublishedNews } from '../../controllers/public/publicNews.controller';

const router = Router();

router.route('/').get(getPublishedNews);
router.route('/:slug').get(getNewsBySlug);

export default router;
