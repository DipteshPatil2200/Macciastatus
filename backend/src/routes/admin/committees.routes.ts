import { Router } from 'express';
import {
  getAllCommittees,
  getCommitteeBySlug,
  createCommittee,
  updateCommittee,
  deleteCommittee,
} from '../../controllers/admin/committees.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getAllCommittees)
  .post(createCommittee);

router.route('/slug/:slug')
  .get(getCommitteeBySlug);

router.route('/:id')
  .put(updateCommittee)
  .delete(deleteCommittee);

export default router;
