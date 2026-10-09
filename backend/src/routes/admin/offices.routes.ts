import { Router } from 'express';
import {
  getAllOffices,
  getAllOfficesAdmin,
  createOffice,
  updateOffice,
  deleteOffice,
} from '../../controllers/admin/offices.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getAllOfficesAdmin)
  .post(createOffice);

router.route('/:id')
  .put(updateOffice)
  .delete(deleteOffice);

export default router;
