import axiosInstance from './axiosInstance';

export const getDailyAnalyticsApi = async (date) => {
  const response = await axiosInstance.get('/analytics/daily', {
    params: date ? { date } : {},
  });
  return response.data;
};

export const getWeeklyAnalyticsApi = async () => {
  const response = await axiosInstance.get('/analytics/weekly');
  return response.data;
};

export const getCategoryBreakdownApi = async () => {
  const response = await axiosInstance.get('/analytics/category-breakdown');
  return response.data;
};