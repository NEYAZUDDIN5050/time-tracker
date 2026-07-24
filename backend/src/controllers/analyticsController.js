import {
  getDailyAnalytics,
  getWeeklyAnalytics,
  getCategoryBreakdown,
} from '../services/analyticsService.js';
import wrapAsync from '../utils/wrapAsync.js';

export const getDailyAnalyticsHandler = wrapAsync(async (req, res) => {
  const { date } = req.query;

  const result = await getDailyAnalytics(req.user.id, date);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getWeeklyAnalyticsHandler = wrapAsync(async (req, res) => {
  const result = await getWeeklyAnalytics(req.user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getCategoryBreakdownHandler = wrapAsync(async (req, res) => {
  const result = await getCategoryBreakdown(req.user.id);

  res.status(200).json({
    success: true,
    data: result,
  });
});