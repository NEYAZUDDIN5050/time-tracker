import express from 'express';
import { body } from 'express-validator';
import { linkTelegramHandler } from '../controllers/notificationController.js';
import validate from '../middleware/validate.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post(
  '/telegram/link',
  [body('chatId').notEmpty().withMessage('Chat ID is required')],
  validate,
  linkTelegramHandler
);

export default router;