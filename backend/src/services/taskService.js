import Task from '../models/Task.js';

export const createTask = async (userId, taskData) => {
  const task = await Task.create({
    ...taskData,
    userId,
  });

  return task;
};

export const getTasks = async (userId, filters = {}) => {
  const { status, category, page = 1, limit = 10 } = filters;

  const query = { userId };

  if (status) query.status = status;
  if (category) query.category = category;

  const skip = (page - 1) * limit;

  const tasks = await Task.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Task.countDocuments(query);

  return {
    tasks,
    pagination: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, userId });

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  return task;
};

export const updateTask = async (userId, taskId, updates) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, userId },
    updates,
    { new: true, runValidators: true }
  );

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  return task;
};

export const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  return task;
};