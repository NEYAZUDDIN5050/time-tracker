import express from 'express';
import { body, param, query } from 'express-validator';
import {
  createNoteHandler,
  getNotesHandler,
  updateNoteHandler,
  deleteNoteHandler,
} from '../controllers/noteController.js';
import validate from '../middleware/validate.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/',
  [
    body('content').notEmpty().withMessage('Note content is required'),
    body('taskId').optional().isMongoId().withMessage('Invalid task ID'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
  ],
  validate,
  createNoteHandler
);

router.get(
  '/',
  [
    query('taskId').optional().isMongoId().withMessage('Invalid task ID'),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1 }),
  ],
  validate,
  getNotesHandler
);

router.patch(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid note ID'),
    body('content').optional().notEmpty().withMessage('Content cannot be empty'),
    body('tags').optional().isArray().withMessage('Tags must be an array'),
  ],
  validate,
  updateNoteHandler
);

router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Invalid note ID')],
  validate,
  deleteNoteHandler
);

export default router;