import { Router } from 'express';
import { protect, adminOnly } from '../../middleware/auth';
import { createAnnouncement, deleteAnnouncement, getAnnouncements, updateAnnouncement } from '../../controllers/admin/announcements.controller';

const router = Router();
router.use(protect, adminOnly);
router.route('/').get(getAnnouncements).post(createAnnouncement);
router.route('/:id').put(updateAnnouncement).delete(deleteAnnouncement);
export default router;
