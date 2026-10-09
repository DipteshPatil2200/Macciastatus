import { Router } from 'express';
import { getSettings, updateSettings } from '../../controllers/admin/settings.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getSettings)
  .put(updateSettings);

export default router;
