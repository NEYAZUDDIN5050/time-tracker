import express from 'express';
import { body, param, query } from 'express-validator';
import {
  startSessionHandler,
  stopSessionHandler,
  cancelSessionHandler,
  getSessionsHandler,
  getRunningSessionHandler,
} from '../controllers/focusSessionController.js';
import validate from '../middleware/validate.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/start',
  [
    body('taskId').optional().isMongoId().withMessage('Invalid task ID'),
    body('type')
      .optional()
      .isIn(['pomodoro', 'deep-work', 'custom'])
      .withMessage('Invalid session type'),
  ],
  validate,
  startSessionHandler
);

router.patch(
  '/:id/stop',
  [param('id').isMongoId().withMessage('Invalid session ID')],
  validate,
  stopSessionHandler
);

router.patch(
  '/:id/cancel',
  [param('id').isMongoId().withMessage('Invalid session ID')],
  validate,
  cancelSessionHandler
);

router.get(
  '/',
  [
    query('taskId').optional().isMongoId().withMessage('Invalid task ID'),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1 }),
  ],
  validate,
  getSessionsHandler
);

router.get('/running', getRunningSessionHandler);

export default router;