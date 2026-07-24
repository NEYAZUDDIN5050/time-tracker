import User from '../models/User.js';
import { sendTelegramMessage } from '../utils/telegramService.js';

export const linkTelegram = async (userId, chatId) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { telegramChatId: chatId },
    { new: true }
  );

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  await sendTelegramMessage(
    chatId,
    `✅ Telegram linked successfully! You'll now receive TimeTrack alerts here.`
  );

  return user;
};