import { Router } from 'express';
import {
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,
} from '../../controllers/admin/membership.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/applications')
  .get(getAllApplications);

router.route('/applications/:id')
  .get(getApplicationById)
  .put(updateApplicationStatus)
  .delete(deleteApplication);

export default router;
