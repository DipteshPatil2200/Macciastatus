import { Router } from 'express';
import {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../../controllers/admin/testimonials.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getAllTestimonials)
  .post(createTestimonial);

router.route('/:id')
  .put(updateTestimonial)
  .delete(deleteTestimonial);

export default router;
