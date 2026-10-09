import { Router } from 'express';
import {
  getAllEnquiries,
  getEnquiryById,
  updateEnquiry,
  deleteEnquiry,
} from '../../controllers/admin/contact.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getAllEnquiries);

router.route('/:id')
  .get(getEnquiryById)
  .put(updateEnquiry)
  .delete(deleteEnquiry);

export default router;
