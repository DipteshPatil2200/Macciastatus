import { Router } from 'express';
import { getHomepageData } from '../../controllers/public/homepage.controller';

const router = Router();

router.route('/').get(getHomepageData);

export default router;
