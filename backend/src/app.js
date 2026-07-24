import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './config/logger.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import focusSessionRoutes from './routes/focusSessionRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { sendTelegramMessage } from './utils/telegramService.js';
import notificationRoutes from './routes/notificationRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/api/test-telegram', async (req, res) => {
  await sendTelegramMessage(process.env.TELEGRAM_CHAT_ID, '🎉 TimeTrack bot connected successfully!');
  res.json({ success: true });
});

const morganStream = {
    write: (message) => logger.info(message.trim()),

};
app.use(morgan('combined', { stream: morganStream }));

app.get('/api/health',  (req, res) =>{
    res.status(200).json({ success: true, message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/sessions', focusSessionRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found'});
});

app.use(errorHandler);

export default app;













