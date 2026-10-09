import { Router } from 'express';
import {
  getAllVenues,
  createVenue,
  updateVenue,
  deleteVenue,
  getAllBookings,
} from '../../controllers/admin/venues.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/venues')
  .get(getAllVenues)
  .post(createVenue);

router.route('/venues/:id')
  .put(updateVenue)
  .delete(deleteVenue);

router.route('/bookings')
  .get(getAllBookings);

export default router;
