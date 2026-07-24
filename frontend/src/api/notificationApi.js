import axiosInstance from './axiosInstance';

export const linkTelegramApi = async (chatId) => {
  const response = await axiosInstance.post('/notifications/telegram/link', { chatId });
  return response.data;
};