import cron from 'node-cron';
import FocusSession from '../models/FocusSession.js';
import Task from '../models/Task.js';
import User from '../models/user.js';
import { sendTelegramMessage } from '../utils/telegramService.js';
import logger from '../config/logger.js';

const sendDailySummary = async () => {
  try {
    const users = await User.find({ telegramChatId: { $ne: null } });

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    for (const user of users) {
      const sessions = await FocusSession.find({
        userId: user._id,
        status: 'completed',
        startTime: { $gte: startOfToday, $lte: endOfToday },
      });

      const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);

      const completedTasks = await Task.countDocuments({
        userId: user._id,
        status: 'completed',
        updatedAt: { $gte: startOfToday, $lte: endOfToday },
      });

      if (totalMinutes === 0 && completedTasks === 0) continue;

      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      const message = `📊 <b>Daily Summary</b>\n\nFocus time: ${hours}h ${minutes}m\nTasks completed: ${completedTasks}\nSessions: ${sessions.length}\n\nKeep it up! 💪`;

      try {
        await sendTelegramMessage(user.telegramChatId, message);
        logger.info(`Daily summary sent to user ${user._id}`);
      } catch (err) {
        logger.error(`Failed to send daily summary to ${user._id}: ${err.message}`);
      }
    }
  } catch (error) {
    logger.error(`Daily summary job failed: ${error.message}`);
  }
};

export const startDailySummaryJob = () => {
  cron.schedule('0 21 * * *', sendDailySummary);
  logger.info('Daily summary cron job started (runs at 9 PM daily)');
};