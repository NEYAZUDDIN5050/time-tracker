import axiosInstance from './axiosInstance';

export const getNotesApi = async (filters = {}) => {
  const response = await axiosInstance.get('/notes', { params: filters });
  return response.data;
};

export const createNoteApi = async (noteData) => {
  const response = await axiosInstance.post('/notes', noteData);
  return response.data;
};

export const deleteNoteApi = async (id) => {
  const response = await axiosInstance.delete(`/notes/${id}`);
  return response.data;
};