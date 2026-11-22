import { Router } from 'express';
import { createUser, getUserByUsername } from '../controllers/user.controller.js';

const router = Router();

// Full paths are /api/users + the path below (the prefix is added in app.js)
router.post('/', createUser);
router.get('/:username', getUserByUsername);

export default router;