import { Router } from 'express';
import { subscribe, unsubscribe } from '../../controllers/public/newsletter.controller';
import { contactLimiter } from '../../middleware/rateLimit';

const router = Router();

router.route('/subscribe').post(contactLimiter, subscribe);
router.route('/unsubscribe').post(unsubscribe);

export default router;
