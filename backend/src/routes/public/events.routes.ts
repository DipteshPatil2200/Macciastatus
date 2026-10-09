import { Router } from 'express';
import { getEvents, getEventBySlug, getEventById } from '../../controllers/public/publicEvents.controller';

const router = Router();

router.route('/').get(getEvents);
router.route('/id/:id').get(getEventById);
router.route('/:slug').get(getEventBySlug);

export default router;
