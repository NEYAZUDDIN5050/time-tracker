import cron from 'node-cron';
import FocusSession from '../models/FocusSession.js';
import Task from '../models/Task.js';
import Notification from '../models/Notification.js';
import User from '../models/User.js';
import { sendTelegramMessage } from '../utils/telegramService.js';
import logger from '../config/logger.js';

const checkLimitBreaches = async () => {
  try {
    const runningSessions = await FocusSession.find({ status: 'running' }).populate('taskId');

    for (const session of runningSessions) {
      if (!session.taskId) continue;

      const elapsedMs = new Date() - session.startTime;
      const elapsedMinutes = elapsedMs / 60000;

      if (elapsedMinutes < session.taskId.timeLimitMinutes) continue;

      const alreadyNotified = await Notification.findOne({
        sessionId: session._id,
        type: 'limit-breach',
      });

      if (alreadyNotified) continue;

      const user = await User.findById(session.userId);

      if (!user || !user.telegramChatId) continue;

      const message = `⏰ Time limit crossed!\n\nTask: <b>${session.taskId.title}</b>\nLimit: ${session.taskId.timeLimitMinutes} min\nElapsed: ${Math.round(elapsedMinutes)} min`;

      try {
        await sendTelegramMessage(user.telegramChatId, message);

        await Notification.create({
          userId: session.userId,
          sessionId: session._id,
          message,
          channel: 'telegram',
          type: 'limit-breach',
          status: 'sent',
        });

        logger.info(`Limit-breach alert sent to user ${user._id} for task ${session.taskId._id}`);
      } catch (err) {
        await Notification.create({
          userId: session.userId,
          sessionId: session._id,
          message,
          channel: 'telegram',
          type: 'limit-breach',
          status: 'failed',
        });

        logger.error(`Failed to send limit-breach alert: ${err.message}`);
      }
    }
  } catch (error) {
    logger.error(`Limit check job failed: ${error.message}`);
  }
};

export const startLimitCheckJob = () => {
  cron.schedule('* * * * *', checkLimitBreaches);
  logger.info('Limit-check cron job started (runs every minute)');
};