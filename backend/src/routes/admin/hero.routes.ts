import { Router } from 'express';
import {
  getHeroSlides,
  getHeroSlidesAdmin,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from '../../controllers/admin/hero.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getHeroSlidesAdmin)
  .post(createHeroSlide);

router.route('/:id')
  .put(updateHeroSlide)
  .delete(deleteHeroSlide);

export default router;
