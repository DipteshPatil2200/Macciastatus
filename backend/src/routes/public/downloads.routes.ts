import { Router } from 'express';
import { getDownloads } from '../../controllers/public/downloads.controller';

const router = Router();

router.route('/').get(getDownloads);

export default router;
