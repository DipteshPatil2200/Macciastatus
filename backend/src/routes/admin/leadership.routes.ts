import { Router } from 'express';
import {
  getAllLeadership,
  createMember,
  updateMember,
  deleteMember,
} from '../../controllers/admin/leadership.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getAllLeadership)
  .post(createMember);

router.route('/:id')
  .put(updateMember)
  .delete(deleteMember);

export default router;
