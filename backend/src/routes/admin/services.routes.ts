import { Router } from 'express';
import {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} from '../../controllers/admin/services.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getAllServices)
  .post(createService);

router.route('/slug/:slug')
  .get(getServiceBySlug);

router.route('/:id')
  .put(updateService)
  .delete(deleteService);

export default router;
