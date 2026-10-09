import { Router } from 'express';
import {
  getAllPartners,
  createPartner,
  updatePartner,
  deletePartner,
} from '../../controllers/admin/partners.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getAllPartners)
  .post(createPartner);

router.route('/:id')
  .put(updatePartner)
  .delete(deletePartner);

export default router;
