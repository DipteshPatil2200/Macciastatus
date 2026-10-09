import { Router } from 'express';
import { submitContactForm, getContactInfo } from '../../controllers/public/contact.controller';
import { contactLimiter } from '../../middleware/rateLimit';

const router = Router();

router.route('/submit').post(contactLimiter, submitContactForm);
router.route('/info').get(getContactInfo);

export default router;
