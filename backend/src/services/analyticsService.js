import FocusSession from '../models/FocusSession.js';
import Task from '../models/Task.js';

const getDateRange = (dateStr) => {
  const date = dateStr ? new Date(dateStr) : new Date();

  const start = new Date(date);
  start.setHours(0, 0, 0, 0);

  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  return { start, end };
};

export const getDailyAnalytics = async (userId, dateStr) => {
  const { start, end } = getDateRange(dateStr);

  const sessions = await FocusSession.find({
    userId,
    status: 'completed',
    startTime: { $gte: start, $lte: end },
  });

  const totalFocusMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);

  const tasksCompleted = await Task.countDocuments({
    userId,
    status: 'completed',
    updatedAt: { $gte: start, $lte: end },
  });

  const tasksOverdue = await Task.countDocuments({
    userId,
    status: { $ne: 'completed' },
    dueDate: { $lt: new Date() },
  });

  return {
    date: start.toISOString().split('T')[0],
    totalFocusMinutes,
    sessionsCount: sessions.length,
    tasksCompleted,
    tasksOverdue,
  };
};

export const getWeeklyAnalytics = async (userId) => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const start = new Date();
  start.setDate(start.getDate() - 6);
  start.setHours(0, 0, 0, 0);

  const sessions = await FocusSession.find({
    userId,
    status: 'completed',
    startTime: { $gte: start, $lte: end },
  });

  const dayBuckets = {};

  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = d.toISOString().split('T')[0];
    dayBuckets[key] = 0;
  }

  sessions.forEach((session) => {
    const key = session.startTime.toISOString().split('T')[0];
    if (dayBuckets[key] !== undefined) {
      dayBuckets[key] += session.durationMinutes;
    }
  });

  const dailyBreakdown = Object.entries(dayBuckets).map(([date, minutes]) => ({
    date,
    focusMinutes: minutes,
  }));

  const totalMinutes = sessions.reduce((sum, s) => sum + s.durationMinutes, 0);

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
    totalFocusMinutes: totalMinutes,
    dailyBreakdown,
  };
};

export const getCategoryBreakdown = async (userId) => {
  const sessions = await FocusSession.find({ userId, status: 'completed' }).populate('taskId');

  const categoryTotals = {};

  sessions.forEach((session) => {
    if (!session.taskId) return;

    const category = session.taskId.category || 'General';
    categoryTotals[category] = (categoryTotals[category] || 0) + session.durationMinutes;
  });

  const breakdown = Object.entries(categoryTotals).map(([category, minutes]) => ({
    category,
    focusMinutes: minutes,
  }));

  breakdown.sort((a, b) => b.focusMinutes - a.focusMinutes);

  return breakdown;
};