import { Router } from 'express';
import { createUser, getUserByUsername } from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', requireAuth, createUser);
router.get('/:username', getUserByUsername);

export default router;