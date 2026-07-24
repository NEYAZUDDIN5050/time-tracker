import express from 'express';
import { body, query, param } from 'express-validator';
import {
  createTaskHandler,
  getTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from '../controllers/taskController.js';
import validate from '../middleware/validate.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('timeLimitMinutes')
      .isInt({ min: 1 })
      .withMessage('Time limit must be a positive number'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
  ],
  validate,
  createTaskHandler
);

router.get(
  '/',
  [
    query('status')
      .optional()
      .isIn(['pending', 'in-progress', 'completed', 'overdue'])
      .withMessage('Invalid status'),
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive number'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive number'),
  ],
  validate,
  getTasksHandler
);

router.get(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid task ID')],
  validate,
  getTaskByIdHandler
);

router.patch(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('priority')
      .optional()
      .isIn(['low', 'medium', 'high'])
      .withMessage('Priority must be low, medium, or high'),
    body('status')
      .optional()
      .isIn(['pending', 'in-progress', 'completed', 'overdue'])
      .withMessage('Invalid status'),
  ],
  validate,
  updateTaskHandler
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid task ID')],
  validate,
  deleteTaskHandler
);

export default router;