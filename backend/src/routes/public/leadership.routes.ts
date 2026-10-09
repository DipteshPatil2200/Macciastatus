import { Router } from 'express';
import { getPresident, getAllLeadership, getLeadershipByType } from '../../controllers/public/leadership.controller';

const router = Router();

router.route('/president').get(getPresident);
router.route('/type/:type').get(getLeadershipByType);
router.route('/').get(getAllLeadership);

export default router;
