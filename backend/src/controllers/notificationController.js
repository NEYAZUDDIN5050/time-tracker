import { linkTelegram } from '../services/notificationService.js';
import wrapAsync from '../utils/wrapAsync.js';

export const linkTelegramHandler = wrapAsync(async (req, res) => {
  const { chatId } = req.body;

  const user = await linkTelegram(req.user.id, chatId);

  res.status(200).json({
    success: true,
    message: 'Telegram linked successfully',
    data: { telegramChatId: user.telegramChatId },
  });
});