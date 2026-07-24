import axios from 'axios';
import logger from '../config/logger.js';

export const sendTelegramMessage = async (chatId, message) => {
  try {
    const TELEGRAM_API_URL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}`;

    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    });

    return response.data;
  } catch (error) {
    logger.error(`Telegram send failed: ${error.message}`);
    throw error;
  }
};