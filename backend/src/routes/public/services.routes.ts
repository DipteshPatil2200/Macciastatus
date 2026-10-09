import { Router } from 'express';
import { getServices, getServiceBySlug } from '../../controllers/public/publicServices.controller';
import { contactLimiter } from '../../middleware/rateLimit';

const router = Router();

router.route('/').get(getServices);
router.route('/:slug').get(getServiceBySlug);

export default router;
