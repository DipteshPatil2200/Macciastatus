import { Router } from 'express';
import { applyMembership } from '../../controllers/public/membership.controller';
import { contactLimiter } from '../../middleware/rateLimit';

const router = Router();

router.route('/apply').post(contactLimiter, applyMembership);

export default router;
