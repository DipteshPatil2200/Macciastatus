import { Router } from 'express';
import { getVenues, getVenueBySlug, bookVenue } from '../../controllers/public/publicVenues.controller';
import { contactLimiter } from '../../middleware/rateLimit';

const router = Router();

router.route('/').get(getVenues);
router.route('/:slug').get(getVenueBySlug);
router.route('/book').post(contactLimiter, bookVenue);

export default router;
