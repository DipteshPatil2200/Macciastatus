import { Router } from 'express';
import {
  getAllDownloads,
  createDownload,
  updateDownload,
  deleteDownload,
} from '../../controllers/admin/downloads.controller';
import { protect, adminOnly } from '../../middleware/auth';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getAllDownloads)
  .post(createDownload);

router.route('/:id')
  .put(updateDownload)
  .delete(deleteDownload);

export default router;
