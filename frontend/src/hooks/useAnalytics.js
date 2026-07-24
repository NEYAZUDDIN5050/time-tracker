import { useQuery } from '@tanstack/react-query';
import {
  getDailyAnalyticsApi,
  getWeeklyAnalyticsApi,
  getCategoryBreakdownApi,
} from '../api/analyticsApi';

export const useDailyAnalytics = (date) => {
  return useQuery({
    queryKey: ['analytics', 'daily', date],
    queryFn: () => getDailyAnalyticsApi(date),
  });
};

export const useWeeklyAnalytics = () => {
  return useQuery({
    queryKey: ['analytics', 'weekly'],
    queryFn: getWeeklyAnalyticsApi,
  });
};

export const useCategoryBreakdown = () => {
  return useQuery({
    queryKey: ['analytics', 'category'],
    queryFn: getCategoryBreakdownApi,
  });
};