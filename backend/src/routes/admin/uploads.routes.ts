import { Router } from 'express';
import { uploadImageFile, uploadDocumentFile } from '../../controllers/admin/uploads.controller';
import { protect, adminOnly } from '../../middleware/auth';
import { uploadSingle } from '../../middleware/upload';

const router = Router();

router.use(protect, adminOnly);

router.route('/image')
  .post(uploadSingle('file'), uploadImageFile);

router.route('/document')
  .post(uploadSingle('file'), uploadDocumentFile);

export default router;
