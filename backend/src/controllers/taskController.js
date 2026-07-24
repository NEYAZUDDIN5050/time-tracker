import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../services/taskService.js';
import wrapAsync from '../utils/wrapAsync.js';

export const createTaskHandler = wrapAsync(async (req, res) => {
  const task = await createTask(req.user.id, req.body);

  res.status(201).json({
    success: true,
    message: 'Task created successfully',
    data: task,
  });
});

export const getTasksHandler = wrapAsync(async (req, res) => {
  const { status, category, page, limit } = req.query;

  const result = await getTasks(req.user.id, { status, category, page, limit });

  res.status(200).json({
    success: true,
    data: result.tasks,
    pagination: result.pagination,
  });
});

export const getTaskByIdHandler = wrapAsync(async (req, res) => {
  const task = await getTaskById(req.user.id, req.params.id);

  res.status(200).json({
    success: true,
    data: task,
  });
});

export const updateTaskHandler = wrapAsync(async (req, res) => {
  const task = await updateTask(req.user.id, req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Task updated successfully',
    data: task,
  });
});

export const deleteTaskHandler = wrapAsync(async (req, res) => {
  await deleteTask(req.user.id, req.params.id);

  res.status(200).json({
    success: true,
    message: 'Task deleted successfully',
  });
});