import axiosInstance from './axiosInstance';

export const getTasksApi = async (filters = {}) => {
  const response = await axiosInstance.get('/tasks', { params: filters });
  return response.data;
};

export const createTaskApi = async (taskData) => {
  const response = await axiosInstance.post('/tasks', taskData);
  return response.data;
};

export const updateTaskApi = async ({ id, updates }) => {
  const response = await axiosInstance.patch(`/tasks/${id}`, updates);
  return response.data;
};

export const deleteTaskApi = async (id) => {
  const response = await axiosInstance.delete(`/tasks/${id}`);
  return response.data;
};