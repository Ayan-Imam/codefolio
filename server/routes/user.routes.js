import { Router } from 'express';
import { createUser } from '../controllers/user.controller.js';

const router = Router();

// Full path is /api/users + '/' (the prefix is added in app.js)
router.post('/', createUser);

export default router;