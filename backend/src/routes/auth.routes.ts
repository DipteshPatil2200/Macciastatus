import { Router } from 'express';
import { login, logout, verifyToken, changePassword } from '../controllers/auth.controller';
import { authLimiter } from '../middleware/rateLimit';
import { protect } from '../middleware/auth';

const router = Router();

router.post('/login', authLimiter, login);
router.post('/logout', logout);
router.get('/verify', verifyToken);
router.put('/change-password', protect, changePassword);

export default router;
