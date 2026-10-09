import { Router } from 'express';
import {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
} from '../../controllers/admin/news.controller';
import { protect, adminOnly } from '../../middleware/auth';
import { uploadSingle } from '../../middleware/upload';

const router = Router();

router.use(protect, adminOnly);

router.route('/')
  .get(getAllNews)
  .post(createNews);

router.route('/:id')
  .get(getNewsById)
  .put(updateNews)
  .delete(deleteNews);

router.route('/:id/upload-image')
  .post(uploadSingle('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    res.status(200).json({
      success: true,
      data: {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename,
        originalName: req.file.originalname,
      },
    });
  });

export default router;
