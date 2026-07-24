import express from 'express';
import { query } from 'express-validator';
import {
  getDailyAnalyticsHandler,
  getWeeklyAnalyticsHandler,
  getCategoryBreakdownHandler,
} from '../controllers/analyticsController.js';
import validate from '../middleware/validate.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get(
  '/daily',
  [query('date').optional().isISO8601().withMessage('Date must be a valid date (YYYY-MM-DD)')],
  validate,
  getDailyAnalyticsHandler
);

router.get('/weekly', getWeeklyAnalyticsHandler);

router.get('/category-breakdown', getCategoryBreakdownHandler);

export default router;