import { Router } from 'express';
import {
  createUser,
  getMyPortfolio,
  getUserByUsername,
  listMyPortfolios,
  updateMyPortfolio,
} from '../controllers/user.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', requireAuth, createUser);

router.get('/me/portfolios', requireAuth, listMyPortfolios);
router.get('/me/portfolios/:username', requireAuth, getMyPortfolio);
router.patch('/me/portfolios/:username', requireAuth, updateMyPortfolio);

router.get('/:username', getUserByUsername);

export default router;