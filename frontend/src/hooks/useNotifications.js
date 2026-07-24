import { useMutation } from '@tanstack/react-query';
import { linkTelegramApi } from '../api/notificationApi';

export const useLinkTelegram = () => {
  return useMutation({
    mutationFn: linkTelegramApi,
  });
};