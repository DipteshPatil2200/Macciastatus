import { Router } from 'express';
import {
  getStatistics,
  getStatisticsAdmin,
  createStatistic,
  updateStatistic,
  deleteStatistic,
} from '../../controllers/admin/statistics.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getStatisticsAdmin)
  .post(createStatistic);

router.route('/:id')
  .put(updateStatistic)
  .delete(deleteStatistic);

export default router;
