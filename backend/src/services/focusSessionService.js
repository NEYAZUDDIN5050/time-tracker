import FocusSession from '../models/FocusSession.js';
import Task from '../models/Task.js';

export const startSession = async (userId, { taskId, type }) => {
  const existingRunning = await FocusSession.findOne({ userId, status: 'running' });

  if (existingRunning) {
    const error = new Error('You already have a running session. Stop it before starting a new one.');
    error.statusCode = 409;
    throw error;
  }

  if (taskId) {
    const task = await Task.findOne({ _id: taskId, userId });
    if (!task) {
      const error = new Error('Task not found');
      error.statusCode = 404;
      throw error;
    }

    if (task.status === 'pending') {
      task.status = 'in-progress';
      await task.save();
    }
  }

  const session = await FocusSession.create({
    userId,
    taskId: taskId || null,
    type: type || 'custom',
    startTime: new Date(),
    status: 'running',
  });

  return session;
};

export const stopSession = async (userId, sessionId) => {
  const session = await FocusSession.findOne({ _id: sessionId, userId });

  if (!session) {
    const error = new Error('Session not found');
    error.statusCode = 404;
    throw error;
  }

  if (session.status !== 'running') {
    const error = new Error('Session is not running');
    error.statusCode = 400;
    throw error;
  }

  const endTime = new Date();
  const durationMs = endTime - session.startTime;
  const durationMinutes = Math.round(durationMs / 60000);

  session.endTime = endTime;
  session.durationMinutes = durationMinutes;
  session.status = 'completed';
  await session.save();

  if (session.taskId) {
    await Task.findByIdAndUpdate(session.taskId, {
      $inc: { timeSpentMinutes: durationMinutes },
    });
  }

  return session;
};

export const cancelSession = async (userId, sessionId) => {
  const session = await FocusSession.findOne({ _id: sessionId, userId });

  if (!session) {
    const error = new Error('Session not found');
    error.statusCode = 404;
    throw error;
  }

  if (session.status !== 'running') {
    const error = new Error('Session is not running');
    error.statusCode = 400;
    throw error;
  }

  session.status = 'cancelled';
  session.endTime = new Date();
  await session.save();

  return session;
};

export const getSessions = async (userId, filters = {}) => {
  const { taskId, from, to, page = 1, limit = 10 } = filters;

  const query = { userId };

  if (taskId) query.taskId = taskId;

  if (from || to) {
    query.startTime = {};
    if (from) query.startTime.$gte = new Date(from);
    if (to) query.startTime.$lte = new Date(to);
  }

  const skip = (page - 1) * limit;

  const sessions = await FocusSession.find(query)
    .sort({ startTime: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await FocusSession.countDocuments(query);

  return {
    sessions,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getRunningSession = async (userId) => {
  const session = await FocusSession.findOne({ userId, status: 'running' });
  return session;
};