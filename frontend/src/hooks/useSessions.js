import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
const startSessionApi = async ({ taskId, type }) => {
  const response = await axiosInstance.post('/sessions/start', { taskId, type });
  return response.data;
};

const stopSessionApi = async (sessionId) => {
  const response = await axiosInstance.patch(`/sessions/${sessionId}/stop`);
  return response.data;
};

const getRunningSessionApi = async () => {
  const response = await axiosInstance.get('/sessions/running');
  return response.data;
};

export const useRunningSession = () => {
  return useQuery({
    queryKey: ['runningSession'],
    queryFn: getRunningSessionApi,
    refetchInterval: 5000,
  });
};

export const useStartSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: startSessionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['runningSession'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

export const useStopSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: stopSessionApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['runningSession'] });
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
